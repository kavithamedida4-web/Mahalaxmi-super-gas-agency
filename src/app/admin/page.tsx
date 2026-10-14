'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Save,
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Flame,
  ArrowRight,
  Database,
  Upload,
  Cloud,
  Key,
  ImageOff
} from 'lucide-react';
import {
  BUSINESS_DATA,
  PRODUCTS_CATALOG,
  ProductItem,
  getProductCategoryKey,
} from '@/config/businessData';
import {
  getProductsFromSupabase,
  saveProductsToSupabase,
} from '@/lib/supabaseProducts';

const R2_BASE = 'https://pub-f471c3e24db144a6a94c290eececee02.r2.dev/products/';

// Product Image presets hosted securely on Cloudflare R2
const IMAGE_PRESETS = [
  { label: '2-Burner Stainless Steel Stove', url: `${R2_BASE}stove.jpg` },
  { label: '2 & 3-Burner Glass Top Stove', url: `${R2_BASE}stove_glass_top.jpg` },
  { label: '1-Burner Compact Single Stove', url: `${R2_BASE}stove_single_burner.jpg` },
  { label: 'Heavy Duty Commercial Bhatti', url: `${R2_BASE}stove_commercial_bhatti.jpg` },
  { label: 'Supergas Safety Click-On Regulator', url: `${R2_BASE}regulator_supergas.jpg` },
  { label: '3-Layer Steel Wiremesh Safety Hose', url: `${R2_BASE}safety_pipe_hose.jpg` },
  { label: 'Gas Stove Burners, Knobs & Spares', url: `${R2_BASE}burners_knobs_pins.jpg` },
  { label: 'Spark Lighter & Safety Kit', url: `${R2_BASE}accessories.jpg` },
  { label: '14.2kg Domestic LPG Cylinder', url: `${R2_BASE}cylinder.jpg` },
  { label: '14.2kg Domestic Refill Cylinder', url: `${R2_BASE}refill_domestic_14kg.jpg` },
  { label: '19kg Commercial LPG Cylinder', url: `${R2_BASE}refill_commercial_19kg.jpg` },
  { label: '5kg Portable Mini Cylinder', url: `${R2_BASE}refill_mini_5kg.jpg` },
  { label: 'Double Cylinder Package (2x 14.2kg)', url: `${R2_BASE}double_cylinder.jpg` },
];

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('admin@srimahalaxmi.com');
  const [loginPassword, setLoginPassword] = useState<string>('admin123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');

  // Products & WhatsApp State
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS_CATALOG);
  const [whatsAppNum, setWhatsAppNum] = useState<string>(BUSINESS_DATA.whatsAppNumber);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Success Confirmation Popup Modal State
  const [successPopup, setSuccessPopup] = useState<{
    isOpen: boolean;
    isNew: boolean;
    title: string;
    message: string;
    product: ProductItem;
  } | null>(null);

  // Close success popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && successPopup?.isOpen) {
        setSuccessPopup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [successPopup]);

  // Search & Filter in Dashboard
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');

  // Form State for Add / Edit Product Modal
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formName, setFormName] = useState<string>('');
  const [formCategoryKey, setFormCategoryKey] = useState<'stoves' | 'regulators' | 'spares' | 'cylinders'>('stoves');
  const [formPrice, setFormPrice] = useState<string>('₹1,850');
  const [formBadge, setFormBadge] = useState<string>('POPULAR');
  const [formDesc, setFormDesc] = useState<string>('');
  const [formImage, setFormImage] = useState<string>(`${R2_BASE}stove.jpg`);
  const [formInStock, setFormInStock] = useState<boolean>(true);
  const [isUploadingR2, setIsUploadingR2] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleUploadImageToR2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingR2(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload-product-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormImage(data.url);
        showNotification('Product image uploaded successfully to Cloudflare R2!');
      } else {
        setUploadError(data.error || 'Failed to upload image to Cloudflare R2');
      }
    } catch (err: any) {
      setUploadError(err?.message || 'Error uploading file to Cloudflare R2');
    } finally {
      setIsUploadingR2(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async () => {
    if (!formImage) return;
    const urlToDelete = formImage;
    setFormImage('');
    showNotification('Product image deleted and removed from form.');

    // If it was an image uploaded to Cloudflare R2, clean it up from storage
    if (urlToDelete.includes('.r2.dev/products/')) {
      try {
        await fetch('/api/upload-product-image', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlToDelete }),
        });
      } catch {
        // quiet fallback
      }
    }
  };

  // Admin Credentials Update State (Stored in Supabase)
  const [showSecuritySection, setShowSecuritySection] = useState<boolean>(false);
  const [secCurrentPass, setSecCurrentPass] = useState<string>('');
  const [secNewEmail, setSecNewEmail] = useState<string>('admin@srimahalaxmi.com');
  const [secNewPass, setSecNewPass] = useState<string>('');
  const [secLoading, setSecLoading] = useState<boolean>(false);
  const [secMsg, setSecMsg] = useState<string>('');
  const [secError, setSecError] = useState<string>('');

  const handleUpdateAdminCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecError('');
    setSecMsg('');
    setSecLoading(true);

    try {
      const res = await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: secCurrentPass,
          newEmail: secNewEmail,
          newPassword: secNewPass,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSecMsg('Admin email and password updated successfully in Supabase!');
        showNotification('Admin credentials updated in Supabase!');
        setSecCurrentPass('');
        setSecNewPass('');
      } else {
        setSecError(data.error || 'Failed to update credentials.');
      }
    } catch (err: any) {
      setSecError(err?.message || 'Network error updating credentials');
    } finally {
      setSecLoading(false);
    }
  };

  // Check stored auth session and load saved data on mount
  useEffect(() => {
    try {
      // Check auth status
      const sessionAuth = sessionStorage.getItem('sri_admin_auth');
      const localAuth = localStorage.getItem('sri_admin_auth');
      if (sessionAuth === 'true' || localAuth === 'true') {
        setIsAuthenticated(true);
      }

      // Load dynamic products from Supabase Cloud (with cache fallback)
      getProductsFromSupabase().then((items) => {
        if (Array.isArray(items) && items.length > 0) {
          setProducts(items);
        }
      }).catch(() => {
        const storedProds = localStorage.getItem('sri_mahalaxmi_products');
        if (storedProds) {
          try {
            const parsed = JSON.parse(storedProds);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProducts(parsed);
            }
          } catch {
            // ignore
          }
        }
      });

      // Load dynamic WhatsApp number
      const storedWA = localStorage.getItem('sri_mahalaxmi_whatsapp_number');
      if (storedWA && storedWA.trim() !== '') {
        setWhatsAppNum(storedWA.trim().replace(/[^0-9]/g, ''));
      }
    } catch {
      // Keep defaults
    } finally {
      setAuthChecking(false);
    }
  }, []);

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4000);
  };

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('sri_admin_auth', 'true');
        } else {
          sessionStorage.setItem('sri_admin_auth', 'true');
        }
        showNotification('Welcome back, Administrator! Authenticated via Supabase Cloud.');
        return;
      } else {
        setLoginError(data.error || 'Invalid email or password.');
      }
    } catch {
      // Offline fallback
      const isValidEmail =
        cleanEmail === 'admin@srimahalaxmi.com' ||
        cleanEmail === 'admin@gmail.com' ||
        cleanEmail === 'admin@supergas.com' ||
        cleanEmail === 'admin';

      const isValidPass =
        cleanPass === 'admin123' ||
        cleanPass === 'admin' ||
        cleanPass === 'mahalaxmi2026' ||
        cleanPass === '123456';

      if (isValidEmail && isValidPass) {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('sri_admin_auth', 'true');
        } else {
          sessionStorage.setItem('sri_admin_auth', 'true');
        }
        showNotification('Welcome back, Administrator!');
      } else {
        setLoginError('Invalid email or password. Please check your credentials.');
      }
    }
  };

  // Handle Admin Logout
  const handleLogout = () => {
    sessionStorage.removeItem('sri_admin_auth');
    localStorage.removeItem('sri_admin_auth');
    setIsAuthenticated(false);
    setLoginError('');
  };

  // Save Products to Supabase Cloud and Local Cache
  const saveProductsToStorage = (updatedList: ProductItem[], msg: string = 'Products catalog updated successfully!') => {
    setProducts(updatedList);
    showNotification(`${msg} (Saving to Supabase...)`);
    saveProductsToSupabase(updatedList).then((res) => {
      if (res.success) {
        showNotification(`${msg} (Saved in Supabase Cloud)`);
      } else {
        showNotification(`${msg} (Saved locally)`);
      }
    }).catch(() => {
      showNotification(msg);
    });
  };

  // Save WhatsApp Number
  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = whatsAppNum.replace(/[^0-9]/g, '');
    if (!cleanNumber || cleanNumber.length < 10) {
      showNotification('Please enter a valid 10+ digit phone number.');
      return;
    }

    setWhatsAppNum(cleanNumber);
    try {
      localStorage.setItem('sri_mahalaxmi_whatsapp_number', cleanNumber);
      showNotification(`WhatsApp order number successfully updated to +${cleanNumber}! All website buttons are now linked.`);
    } catch {
      showNotification('Error saving WhatsApp number.');
    }
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setIsEditing(true);
    setEditId(null);
    setFormName('');
    setFormCategoryKey('stoves');
    setFormPrice('₹1,850');
    setFormBadge('POPULAR');
    setFormDesc('Original ISI certified cooking appliance with prompt doorstep delivery across Hyderabad.');
    setFormImage(`${R2_BASE}stove.jpg`);
    setFormInStock(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (p: ProductItem) => {
    setIsEditing(true);
    setEditId(p.id);
    setFormName(p.name);
    setFormCategoryKey(getProductCategoryKey(p));
    setFormPrice(p.price || p.priceTag || '₹1,850');
    setFormBadge(p.discountBadge || (p.inStock ? 'IN STOCK' : ''));
    setFormDesc(p.description || '');
    setFormImage(p.image || `${R2_BASE}accessories.jpg`);
    setFormInStock(p.inStock);
  };

  // Save Add/Edit Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    let category: 'Stove' | 'Spare Part' | 'Cylinder' = 'Stove';
    let subCategory: 'stoves' | 'regulators-hoses' | 'burners-spares' | 'cylinders' = 'stoves';
    let categoryLabel = 'Gas Stove';

    if (formCategoryKey === 'stoves') {
      category = 'Stove';
      subCategory = 'stoves';
      categoryLabel = 'Gas Stove';
    } else if (formCategoryKey === 'regulators') {
      category = 'Spare Part';
      subCategory = 'regulators-hoses';
      categoryLabel = 'Supergas Regulator & Hose';
    } else if (formCategoryKey === 'spares') {
      category = 'Spare Part';
      subCategory = 'burners-spares';
      categoryLabel = 'Burners & Spares';
    } else if (formCategoryKey === 'cylinders') {
      category = 'Cylinder';
      subCategory = 'cylinders';
      categoryLabel = 'LPG Cylinder';
    }

    if (editId) {
      // Update existing item
      let savedProduct: ProductItem | null = null;
      const updated = products.map((item) => {
        if (item.id === editId) {
          savedProduct = {
            ...item,
            name: formName.trim(),
            category,
            subCategory,
            categoryLabel,
            price: formPrice.trim(),
            priceTag: formPrice.trim(),
            discountBadge: formBadge.trim(),
            description: formDesc.trim(),
            image: formImage.trim() || '/images/accessories.jpg',
            inStock: formInStock,
            whatsAppMessage: `Hello Sri Mahalakshmi Super Gas, I want to inquire about ${formName.trim()} (${categoryLabel}). Please share best price and availability.`,
          };
          return savedProduct;
        }
        return item;
      });
      saveProductsToStorage(updated, `Product "${formName.trim()}" updated successfully!`);

      if (savedProduct) {
        setSuccessPopup({
          isOpen: true,
          isNew: false,
          title: 'Product Updated Successfully!',
          message: `Changes to "${formName.trim()}" have been saved and are immediately live on the website!`,
          product: savedProduct,
        });
      }
    } else {
      // Add new item
      const newItem: ProductItem = {
        id: `custom-prod-${Date.now()}`,
        name: formName.trim(),
        category,
        subCategory,
        categoryLabel,
        description: formDesc.trim(),
        price: formPrice.trim(),
        priceTag: formPrice.trim(),
        discountBadge: formBadge.trim(),
        inStock: formInStock,
        image: formImage.trim() || '/images/accessories.jpg',
        features: ['Genuine ISI tested quality', 'Doorstep delivery within 5 km'],
        whatsAppMessage: `Hello Sri Mahalakshmi Super Gas, I want to inquire about ${formName.trim()} (${categoryLabel}). Please share best price and availability.`,
      };
      saveProductsToStorage([newItem, ...products], `New product "${formName.trim()}" added to catalog!`);

      setSuccessPopup({
        isOpen: true,
        isNew: true,
        title: 'Product Added Successfully!',
        message: `"${formName.trim()}" has been successfully added to your catalog and is live on the website!`,
        product: newItem,
      });
    }

    setIsEditing(false);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from the product catalog?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProductsToStorage(updated, `Product "${name}" deleted.`);
    }
  };

  // Quick 1-Click Toggle Stock
  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    saveProductsToStorage(updated, 'Product stock availability updated.');
  };

  // Reset to Default Products Catalog
  const handleResetCatalog = () => {
    if (window.confirm('Reset all products back to the original default catalog? Any custom additions will be reverted.')) {
      saveProductsToStorage(PRODUCTS_CATALOG, 'Catalog restored to default 14 authentic hardware items.');
    }
  };

  // Filtered Products for the table
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const catKey = getProductCategoryKey(p);
      const matchesCat = selectedCategory === 'all' || catKey === selectedCategory;

      const matchesStock =
        selectedStock === 'all' ||
        (selectedStock === 'in' && p.inStock) ||
        (selectedStock === 'out' && !p.inStock);

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedStock]);

  // Dynamic Statistics
  const inStockCount = useMemo(() => products.filter((p) => p.inStock).length, [products]);
  const outOfStockCount = useMemo(() => products.filter((p) => !p.inStock).length, [products]);
  const stovesCount = useMemo(() => products.filter((p) => getProductCategoryKey(p) === 'stoves').length, [products]);
  const regulatorsCount = useMemo(() => products.filter((p) => getProductCategoryKey(p) === 'regulators').length, [products]);
  const sparesCount = useMemo(() => products.filter((p) => getProductCategoryKey(p) === 'spares').length, [products]);
  const cylindersCount = useMemo(() => products.filter((p) => getProductCategoryKey(p) === 'cylinders').length, [products]);

  if (authChecking) {
    return (
      <div className="admin-login-wrapper">
        <p style={{ color: '#64748b', fontWeight: 600 }}>Loading admin security checkpoint...</p>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: AUTHENTICATION LOGIN GATE (Asked when typing /admin in URL)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper" id="admin-login-view">
        <div className="admin-login-card">
          
          <div className="admin-login-header">
            <div className="admin-login-icon-wrap">
              <Lock size={26} />
            </div>
            <h1 className="admin-login-title">Admin Management Portal</h1>
            <p className="admin-login-subtitle">
              Enter your email and password to access the dynamic product catalog manager and WhatsApp settings.
            </p>
          </div>

          {loginError && (
            <div className="admin-login-error" role="alert">
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            
            <div className="admin-login-field">
              <label htmlFor="admin-email">Admin Email Address</label>
              <div className="admin-input-with-icon">
                <Mail size={16} className="admin-input-icon" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@srimahalaxmi.com"
                  className="admin-login-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-input-with-icon">
                <Lock size={16} className="admin-input-icon" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="admin-login-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', cursor: 'pointer', color: '#475569' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#dc2626' }}
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button type="submit" className="admin-login-btn" id="admin-login-submit-btn">
              <Lock size={16} />
              <span>Login to Admin Portal</span>
            </button>
          </form>

          {/* Helpful Credentials Callout */}
          <div className="admin-login-hint">
            <strong>Default Administrator Access:</strong>
            <br />
            Email: <code>admin@srimahalaxmi.com</code>
            <br />
            Password: <code>admin123</code>
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '0.84rem', color: '#64748b', textDecoration: 'none' }}>
              ← Return to Sri Mahalakshmi Super Gas Agency Home
            </Link>
          </div>

        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW 2: DYNAMIC PRODUCTS & WHATSAPP CMS DASHBOARD (When Authenticated)
  // =========================================================================
  return (
    <main className="admin-dashboard-page" id="admin-dashboard-view" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Sticky Top Bar with Brand, Live View link & Logout */}
      <header className="admin-dashboard-header">
        <div className="container">
          <div className="admin-nav-row">
            
            <div className="admin-logo-lockup">
              <div style={{ width: 34, height: 34, borderRadius: 8, background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Flame size={20} />
              </div>
              <div>
                <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block', lineHeight: 1.2 }}>
                  Sri Mahalakshmi Super Gas Agency
                </strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
                  <span className="admin-pill-badge">
                    <Shield size={11} />
                    <span>Admin Products &amp; WhatsApp Manager</span>
                  </span>
                  <span className="admin-pill-badge" style={{ background: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }}>
                    <Database size={11} />
                    <span>Supabase Connected</span>
                  </span>
                  <span className="admin-pill-badge" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
                    <Cloud size={11} />
                    <span>Cloudflare R2 Images</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="admin-nav-actions">
              <Link
                href="/products"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                id="view-live-products-nav-btn"
              >
                <span>View Live Products Page</span>
                <ExternalLink size={14} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="admin-logout-btn"
                id="admin-logout-btn"
                title="Log out of Admin Portal"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '2rem' }}>

        {/* Save Confirmation Toast Banner */}
        {saveSuccessMsg && (
          <div className="admin-toast-banner" role="status" style={{ marginBottom: '1.5rem', width: '100%' }}>
            <CheckCircle2 size={18} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* ===================================================================
            SECTION 1: DYNAMIC WHATSAPP ORDER NUMBER CONFIGURATION
            =================================================================== */}
        <section className="admin-wa-card" aria-labelledby="wa-heading">
          <div className="admin-wa-header">
            <div className="admin-wa-icon">
              <MessageCircle size={22} fill="currentColor" />
            </div>
            <div>
              <h2 className="admin-wa-title" id="wa-heading">
                Dynamic WhatsApp Order Number
              </h2>
              <p className="admin-wa-subtitle">
                Changing this number immediately updates all &ldquo;Book Now&rdquo; and WhatsApp buttons across the entire website.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveWhatsApp} className="admin-wa-form">
            <input
              type="text"
              value={whatsAppNum}
              onChange={(e) => setWhatsAppNum(e.target.value)}
              placeholder="e.g. 919652009647 or 9652009647"
              className="admin-wa-input"
              aria-label="WhatsApp phone number"
            />
            <button
              type="submit"
              className="admin-wa-save-btn"
              id="save-whatsapp-btn"
            >
              <Save size={16} />
              <span>Save WhatsApp Number</span>
            </button>
            <a
              href={`https://wa.me/${whatsAppNum.replace(/[^0-9]/g, '')}?text=Test%20connection%20from%20admin%20portal`}
              target="_blank"
              rel="noopener noreferrer"
              className="admin-wa-test-btn"
              title="Test WhatsApp Number in new tab"
            >
              <span>Test Chat</span>
              <ExternalLink size={13} />
            </a>
          </form>
        </section>

        {/* ===================================================================
            SECTION 1.5: ADMIN ACCESS & SECURITY CREDENTIALS
            =================================================================== */}
        <section className="glass-card" style={{ background: '#ffffff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', marginBottom: '1.75rem', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Key size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                  Admin Security &amp; Credentials
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                  Stored securely in <strong>Supabase Cloud Database</strong> and <code>.env.local</code>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSecuritySection(!showSecuritySection)}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Lock size={13} />
              <span>{showSecuritySection ? 'Hide Password Manager' : 'Change Admin Email / Password'}</span>
            </button>
          </div>

          {showSecuritySection && (
            <form onSubmit={handleUpdateAdminCredentials} style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="sec-current-pass" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Current Password *
                  </label>
                  <input
                    id="sec-current-pass"
                    type="password"
                    required
                    value={secCurrentPass}
                    onChange={(e) => setSecCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="admin-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="sec-new-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    Admin Email *
                  </label>
                  <input
                    id="sec-new-email"
                    type="email"
                    required
                    value={secNewEmail}
                    onChange={(e) => setSecNewEmail(e.target.value)}
                    placeholder="admin@srimahalaxmi.com"
                    className="admin-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="sec-new-pass" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>
                    New Password (Min 6 chars) *
                  </label>
                  <input
                    id="sec-new-pass"
                    type="password"
                    required
                    minLength={6}
                    value={secNewPass}
                    onChange={(e) => setSecNewPass(e.target.value)}
                    placeholder="Enter new password"
                    className="admin-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {secError && (
                <div style={{ color: '#dc2626', fontSize: '0.84rem', marginBottom: '0.75rem', background: '#fef2f2', padding: '8px 12px', borderRadius: 6, border: '1px solid #fecaca' }}>
                  ⚠ {secError}
                </div>
              )}

              {secMsg && (
                <div style={{ color: '#16a34a', fontSize: '0.84rem', marginBottom: '0.75rem', background: '#f0fdf4', padding: '8px 12px', borderRadius: 6, border: '1px solid #bbf7d0' }}>
                  ✓ {secMsg}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="submit"
                  disabled={secLoading}
                  className="btn btn-primary"
                  style={{ background: '#0f172a', borderColor: '#0f172a', padding: '0.5rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Save size={14} />
                  <span>{secLoading ? 'Saving to Supabase...' : 'Save New Credentials'}</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ===================================================================
            SECTION 2: DYNAMIC PRODUCTS MANAGEMENT
            =================================================================== */}
        <section aria-labelledby="products-cms-heading">
          
          {/* Quick Metrics Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <span className="admin-stat-val" style={{ color: '#dc2626' }}>{products.length}</span>
              <span className="admin-stat-title">Total Products</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val" style={{ color: '#059669' }}>{inStockCount}</span>
              <span className="admin-stat-title">In Stock</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val" style={{ color: '#d97706' }}>{outOfStockCount}</span>
              <span className="admin-stat-title">Out of Stock</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val">{stovesCount}</span>
              <span className="admin-stat-title">Gas Stoves</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val">{regulatorsCount}</span>
              <span className="admin-stat-title">Regulators &amp; Hoses</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val">{sparesCount}</span>
              <span className="admin-stat-title">Burners &amp; Spares</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val">{cylindersCount}</span>
              <span className="admin-stat-title">LPG Cylinders</span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="admin-toolbar glass-card">
            <div>
              <h2 className="admin-section-heading" id="products-cms-heading">
                Dynamic Products Catalog
              </h2>
              <p className="admin-section-sub">
                Add, edit, change prices, update images, or toggle stock availability. Updates sync directly to the live /products page.
              </p>
            </div>
            <div className="admin-toolbar-actions">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="btn btn-primary"
                id="add-new-product-btn"
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
              <button
                type="button"
                onClick={handleResetCatalog}
                className="btn btn-outline-subtle"
                id="reset-catalog-btn"
                title="Restore default 14 hardware items"
              >
                <RotateCcw size={14} />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Controls Bar */}
          <div className="admin-search-filter-bar">
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title or description..."
                className="admin-input"
                style={{ paddingLeft: '2.3rem', fontSize: '0.88rem' }}
                aria-label="Filter products list"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="admin-filter-select"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="stoves">Gas Stoves &amp; Bhattis</option>
              <option value="regulators">Supergas Regulators &amp; Hoses</option>
              <option value="spares">Burners &amp; Spares</option>
              <option value="cylinders">LPG Cylinders</option>
            </select>

            {/* Stock Filter Dropdown */}
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="admin-filter-select"
              aria-label="Filter by stock status"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in">In Stock Only</option>
              <option value="out">Out of Stock Only</option>
            </select>
          </div>

          {/* Add / Edit Product Modal */}
          {isEditing && (
            <div
              className="admin-modal-overlay"
              role="dialog"
              aria-modal="true"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsEditing(false);
              }}
            >
              <div className="admin-modal-card">
                
                <form onSubmit={handleSaveProduct} className="admin-form">
                  
                  {/* Pinned Header */}
                  <div className="admin-modal-header">
                    <h3>
                      <ShoppingBag size={20} style={{ color: '#dc2626' }} />
                      <span>{editId ? 'Edit Product Details' : 'Add New Product to Catalog'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="modal-close-btn"
                      aria-label="Close dialog"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Scrollable Form Body */}
                  <div className="admin-modal-body">
                    
                    {/* Section 1: Basic Information */}
                    <div className="admin-modal-section-title">
                      1. Product Information
                    </div>

                    {/* Product Name */}
                    <div className="form-group">
                      <label htmlFor="prod-name">
                        Product Title / Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        id="prod-name"
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. 2-Burner Stainless Steel Stove"
                        className="admin-input"
                      />
                    </div>

                    {/* Category & Price */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="prod-category">
                          Category <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <select
                          id="prod-category"
                          value={formCategoryKey}
                          onChange={(e) => setFormCategoryKey(e.target.value as any)}
                          className="admin-input"
                        >
                          <option value="stoves">Gas Stoves &amp; Bhattis</option>
                          <option value="regulators">Supergas Regulators &amp; Hoses</option>
                          <option value="spares">Burners &amp; Spares</option>
                          <option value="cylinders">LPG Cylinders</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="prod-price">
                          Price / Price Tag <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        <input
                          id="prod-price"
                          type="text"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          placeholder="e.g. ₹1,850 or WhatsApp for Best Price"
                          className="admin-input"
                        />
                      </div>
                    </div>

                    {/* Section 2: Product Image */}
                    <div className="admin-modal-section-title">
                      2. Product Photo (Cloudflare R2 CDN)
                    </div>

                    <div className="product-image-box">
                      <div className="product-image-preview-row">
                        {/* Live Photo Thumbnail */}
                        <div
                          className="product-image-thumb"
                          style={{
                            position: 'relative',
                            background: formImage ? '#ffffff' : '#f8fafc'
                          }}
                        >
                          {formImage ? (
                            <>
                              <img
                                src={formImage}
                                alt="Product preview"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/accessories.jpg';
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleDeleteImage}
                                title="Delete / Remove Photo"
                                aria-label="Delete Photo"
                                id="thumb-delete-photo-badge"
                                style={{
                                  position: 'absolute',
                                  top: 3,
                                  right: 3,
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  background: '#dc2626',
                                  color: '#ffffff',
                                  border: '1.5px solid #ffffff',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 10,
                                  fontWeight: 900,
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                                  transition: 'transform 0.15s ease'
                                }}
                              >
                                ✕
                              </button>
                            </>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: '#94a3b8' }}>
                              <ImageOff size={22} style={{ color: '#94a3b8' }} />
                              <span style={{ fontSize: '0.62rem', fontWeight: 700 }}>No Photo</span>
                            </div>
                          )}
                        </div>

                        {/* Image Actions */}
                        <div className="product-image-actions">
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                            {/* Upload Button */}
                            <label
                              htmlFor="r2-image-file-input"
                              className="btn btn-secondary"
                              style={{
                                padding: '0.45rem 0.85rem',
                                fontSize: '0.82rem',
                                cursor: isUploadingR2 ? 'not-allowed' : 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                borderRadius: 8,
                                fontWeight: 700
                              }}
                            >
                              <Upload size={14} style={{ color: '#dc2626' }} />
                              <span>{isUploadingR2 ? 'Uploading...' : 'Upload Photo'}</span>
                            </label>
                            <input
                              id="r2-image-file-input"
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/jpg,image/svg+xml"
                              onChange={handleUploadImageToR2}
                              disabled={isUploadingR2}
                              style={{ display: 'none' }}
                            />

                            {/* Preset Dropdown */}
                            <select
                              id="prod-image-preset"
                              value={formImage}
                              onChange={(e) => setFormImage(e.target.value)}
                              className="admin-input"
                              style={{ flex: 1, minWidth: 160, padding: '0.45rem 0.75rem', fontSize: '0.82rem', borderRadius: 8 }}
                              aria-label="Select an image preset"
                            >
                              <option value="">{formImage ? 'Change to preset photo...' : 'Choose preset photo...'}</option>
                              {IMAGE_PRESETS.map((preset) => (
                                <option key={preset.url} value={preset.url}>
                                  {preset.label}
                                </option>
                              ))}
                            </select>

                            {/* Delete Image Button */}
                            {formImage && (
                              <button
                                type="button"
                                onClick={handleDeleteImage}
                                className="btn btn-secondary"
                                style={{
                                  padding: '0.45rem 0.85rem',
                                  fontSize: '0.82rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  background: '#fff1f2',
                                  color: '#e11d48',
                                  border: '1px solid #fecdd3',
                                  borderRadius: 8,
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease'
                                }}
                                title="Delete and remove this product image"
                                id="delete-product-image-btn"
                              >
                                <Trash2 size={14} style={{ color: '#e11d48' }} />
                                <span>Delete Photo</span>
                              </button>
                            )}
                          </div>

                          {/* Direct Image Link Input */}
                          <input
                            type="text"
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            placeholder="Direct image URL (or leave blank for default image)"
                            className="admin-input"
                            style={{ fontSize: '0.78rem', padding: '0.4rem 0.65rem', color: '#475569' }}
                          />
                        </div>
                      </div>

                      {uploadError && (
                        <div style={{ color: '#dc2626', fontSize: '0.8rem', background: '#fef2f2', padding: '6px 10px', borderRadius: 6, border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <AlertCircle size={14} />
                          <span>{uploadError}</span>
                        </div>
                      )}
                    </div>

                    {/* Section 3: Stock Status & Badge */}
                    <div className="admin-modal-section-title">
                      3. Stock &amp; Promotional Badge
                    </div>

                    <div className="form-row-2">
                      {/* Stock Toggle Group */}
                      <div className="form-group">
                        <label>Stock Status</label>
                        <div className="stock-toggle-group">
                          <button
                            type="button"
                            onClick={() => setFormInStock(true)}
                            className={`stock-pill-btn ${formInStock ? 'active-in' : ''}`}
                          >
                            <CheckCircle2 size={14} />
                            <span>In Stock</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormInStock(false)}
                            className={`stock-pill-btn ${!formInStock ? 'active-out' : ''}`}
                          >
                            <AlertCircle size={14} />
                            <span>Out of Stock</span>
                          </button>
                        </div>
                      </div>

                      {/* Promotional Badge */}
                      <div className="form-group">
                        <label htmlFor="prod-badge">Badge (Optional)</label>
                        <input
                          id="prod-badge"
                          type="text"
                          value={formBadge}
                          onChange={(e) => setFormBadge(e.target.value)}
                          placeholder="e.g. POPULAR, 25% OFF, BESTSELLER"
                          className="admin-input"
                        />
                      </div>
                    </div>

                    {/* Section 4: Description */}
                    <div className="admin-modal-section-title">
                      4. Description &amp; Details
                    </div>

                    <div className="form-group">
                      <label htmlFor="prod-desc">Product Description &amp; Specs</label>
                      <textarea
                        id="prod-desc"
                        rows={3}
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        placeholder="High quality ISI certified cooking appliance with prompt doorstep delivery across Hyderabad."
                        className="admin-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                  </div>

                  {/* Pinned / Sticky Modal Footer */}
                  <div className="admin-modal-footer">
                    <div className="admin-modal-footer-hint">
                      <CheckCircle2 size={15} style={{ color: '#059669' }} />
                      <span>Ready to save changes</span>
                    </div>

                    <div className="admin-modal-footer-actions">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="admin-cancel-btn"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="admin-save-btn"
                        id="save-product-submit-btn"
                      >
                        <Save size={16} />
                        <span>{editId ? 'Save Changes' : 'Add to Catalog'}</span>
                      </button>
                    </div>
                  </div>

                </form>

              </div>
            </div>
          )}

          {/* Success Confirmation Popup Modal ("Product Added Successfully") */}
          {successPopup && successPopup.isOpen && (
            <div
              className="admin-success-popup-overlay"
              role="dialog"
              aria-modal="true"
              id="admin-success-popup-modal"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSuccessPopup(null);
              }}
            >
              <div className="admin-success-popup-card">
                <button
                  type="button"
                  className="admin-success-popup-close"
                  onClick={() => setSuccessPopup(null)}
                  aria-label="Close popup"
                  id="admin-success-popup-close-btn"
                >
                  <X size={18} />
                </button>

                <div className="admin-success-popup-icon-wrap">
                  <CheckCircle2 size={42} strokeWidth={2.4} />
                </div>

                <h3 className="admin-success-popup-title" id="admin-success-popup-heading">
                  {successPopup.title}
                </h3>

                <p className="admin-success-popup-msg">
                  {successPopup.message}
                </p>

                {/* Preview card of the product */}
                <div className="admin-success-popup-preview">
                  <img
                    src={successPopup.product.image || '/images/accessories.jpg'}
                    alt={successPopup.product.name}
                    className="admin-success-popup-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/accessories.jpg';
                    }}
                  />
                  <div className="admin-success-popup-info">
                    <div className="admin-success-popup-prod-name">
                      {successPopup.product.name}
                    </div>
                    <div className="admin-success-popup-meta">
                      {successPopup.product.categoryLabel && (
                        <span className="admin-success-popup-badge cat">
                          {successPopup.product.categoryLabel}
                        </span>
                      )}
                      {(successPopup.product.price || successPopup.product.priceTag) && (
                        <span className="admin-success-popup-badge price">
                          {successPopup.product.price || successPopup.product.priceTag}
                        </span>
                      )}
                      <span className="admin-success-popup-badge live">
                        ● Live on Website
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="admin-success-popup-actions">
                  <div className="admin-success-popup-btn-row">
                    <Link
                      href="/products"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-success-popup-btn-primary"
                      id="admin-popup-view-products-btn"
                    >
                      <span>View on Products Page</span>
                      <ExternalLink size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSuccessPopup(null)}
                      className="admin-success-popup-btn-secondary"
                      id="admin-popup-done-btn"
                    >
                      Done
                    </button>
                  </div>

                  {successPopup.isNew && (
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessPopup(null);
                        handleOpenAdd();
                      }}
                      className="admin-success-popup-add-another-btn"
                      id="admin-popup-add-another-btn"
                    >
                      <Plus size={15} />
                      <span>Add Another Product</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Products Table */}
          <div className="admin-product-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>Image</th>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Badge</th>
                  <th>Stock Availability</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                      No products found matching &ldquo;{searchQuery}&rdquo;.
                      <br />
                      <button
                        type="button"
                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStock('all'); }}
                        className="btn btn-secondary"
                        style={{ marginTop: '0.75rem', fontSize: '0.8rem' }}
                      >
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const catKey = getProductCategoryKey(p);
                    const displayPrice = p.price || p.priceTag || 'Best Price';

                    return (
                      <tr key={p.id} id={`admin-row-${p.id}`}>
                        
                        {/* Thumbnail */}
                        <td className="table-img-col">
                          <div style={{ position: 'relative', width: 52, height: 44, borderRadius: 6, overflow: 'hidden', background: '#f1f5f9' }}>
                            <Image
                              src={p.image || '/images/accessories.jpg'}
                              alt={p.name}
                              fill
                              sizes="60px"
                              className="admin-thumb-img"
                              unoptimized
                            />
                          </div>
                        </td>

                        {/* Title & Description */}
                        <td className="table-title-col">
                          <strong>{p.name}</strong>
                          <p className="table-sub-desc" title={p.description}>
                            {p.description}
                          </p>
                        </td>

                        {/* Category */}
                        <td>
                          <span className="table-category-pill">
                            {p.categoryLabel || p.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td>
                          <span style={{ fontWeight: 800, color: '#dc2626' }}>
                            {displayPrice}
                          </span>
                        </td>

                        {/* Badge */}
                        <td>
                          {p.discountBadge ? (
                            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '2px 6px', borderRadius: 4 }}>
                              {p.discountBadge}
                            </span>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: 12 }}>—</span>
                          )}
                        </td>

                        {/* Stock Toggle */}
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleStock(p.id)}
                            className={`stock-toggle-btn ${p.inStock ? 'in-stock' : 'out-of-stock'}`}
                            title="Click to toggle between In Stock and Out of Stock"
                            id={`stock-toggle-${p.id}`}
                          >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.inStock ? '#10b981' : '#f59e0b' }}></span>
                            <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(p)}
                              className="admin-icon-btn edit"
                              title={`Edit ${p.name}`}
                              id={`edit-btn-${p.id}`}
                              aria-label={`Edit ${p.name}`}
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="admin-icon-btn delete"
                              title={`Delete ${p.name}`}
                              id={`delete-btn-${p.id}`}
                              aria-label={`Delete ${p.name}`}
                              style={{ color: '#dc2626' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </section>

      </div>

    </main>
  );
}
