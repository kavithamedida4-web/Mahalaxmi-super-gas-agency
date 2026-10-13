'use client';

import React, { useState } from 'react';
import { ClipboardCheck, ChevronDown, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';
import { PENDING_CONTENT_CHECKLIST } from '../config/businessData';

export const ChecklistSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="checklist-section" id="developer-checklist">
      <div className="container">
        
        <div className="checklist-wrapper">
          <div className="checklist-header">
            <div className="checklist-badge-group">
              <span className="checklist-badge">
                <ClipboardCheck size={14} />
                <span>Developer &amp; Owner Handoff Tool</span>
              </span>
              <span className="checklist-status-badge">
                7 Pending Items Documented
              </span>
            </div>

            <div className="checklist-title-row">
              <div>
                <h3 className="checklist-title">Pre-Launch Business Content Checklist</h3>
                <p className="checklist-subtitle">
                  In accordance with the project brief, unresolved facts are documented here for project owner review before public deployment.
                </p>
              </div>

              <button
                type="button"
                className="checklist-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="checklist-table-container"
              >
                <span>{isOpen ? 'Collapse Checklist' : 'Review 7 Items'}</span>
                <ChevronDown size={18} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
              </button>
            </div>
          </div>

          {isOpen && (
            <div id="checklist-table-container" className="checklist-table-wrap fade-in">
              <div className="table-responsive">
                <table className="checklist-table">
                  <thead>
                    <tr>
                      <th>Business Fact / Detail</th>
                      <th>Current Evidence</th>
                      <th>Status in v1</th>
                      <th>Resolution for Launch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PENDING_CONTENT_CHECKLIST.map((row, index) => (
                      <tr key={index}>
                        <td className="item-name">
                          <FileText size={14} className="cell-icon" />
                          <span>{row.item}</span>
                        </td>
                        <td className="item-evidence">{row.currentEvidence}</td>
                        <td>
                          <span className={`status-tag ${row.status === 'In Progress' ? 'tag-progress' : 'tag-pending'}`}>
                            {row.status === 'In Progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                            <span>{row.status}</span>
                          </span>
                        </td>
                        <td className="item-action">{row.actionNeeded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="checklist-footer-note">
                <CheckCircle size={15} className="footer-note-check" />
                <span>
                  <strong>Implementation Note:</strong> No dummy addresses, invented package prices, fake review counts, or unauthorized brand distributor claims have been introduced into public copy. All actions operate on an enquiry basis.
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
