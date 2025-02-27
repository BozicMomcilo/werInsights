import React, { useState, useEffect, useMemo } from 'react';
import { Calendar,  Globe, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PersonService } from '../../models/services/PersonService';
import { Person } from '../../models/interfaces/Person';
import { ImageSource } from '../../models/interfaces/ImageResource';
import { MemberType } from '../../models/interfaces/MemberType';
import { Subscription } from 'rxjs';
import { InitialsAvatar } from '../shared/InitialsAvatar';

const getMemberTypeColor = (type?: MemberType) => {
  switch (type) {
    case MemberType.CO_INVESTOR:
      return 'text-[#FFE8AC]';
    case MemberType.CO_CREATOR:
      return 'text-[#72A0D6]';
    case MemberType.INTERNAL:
      return 'text-white';
    default:
      return 'text-white';
  }
};

export const MembersOverviewTable: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: 'month',
    type: 'all',
    country: 'all'
  });
  
  const [members, setMembers] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPersons, setTotalPersons] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  
  // Memoize the PersonService instance
  const personService = useMemo(() => new PersonService(), []);

  useEffect(() => {
    const subscriptions: Subscription[] = [];

    // Subscribe to persons updates
    subscriptions.push(
      personService.persons$.subscribe(persons => {
        setMembers(persons);
      })
    );

    // Subscribe to total pages updates
    subscriptions.push(
      personService.totalPages$.subscribe(pages => {
        setTotalPages(pages);
      })
    );

    // Subscribe to current page updates
    subscriptions.push(
      personService.currentPage$.subscribe(page => {
        setCurrentPage(page);
      })
    );

    // Subscribe to total persons count
    subscriptions.push(
      personService.totalPersons$.subscribe(count => {
        setTotalPersons(count);
      })
    );

    // Initial fetch
    personService.fetchPersons(1);

    // Cleanup subscriptions on component unmount
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [personService]);

  const handlePageChange = async (pageNumber: number) => {
    await personService.goToPage(pageNumber);
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/dashboard/members/${memberId}`);
  };

  const getFullName = (person: Person) => {
    return `${person.first_name || ''} ${person.last_name || ''}`.trim() || 'Unknown';
  };

  const getCommittedVolume = (person: Person) => {
    // This is a placeholder - you might want to calculate this based on your business logic
    return '0M';
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesBeforeEllipsis = 4;

    if (totalPages <= maxPagesBeforeEllipsis + 1) {
      // If total pages is less than or equal to maxPagesBeforeEllipsis + 1, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(startPage + 3, totalPages - 1);

      // Adjust start page if we're near the end
      if (currentPage > totalPages - 4) {
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      }

      // Adjust if we're near the start
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }

      // Add pages in range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      if (endPage < totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const getClosestImageSource = (sources: ImageSource[], targetSize: number) => {
    if (!sources || sources.length === 0) return null;
    return sources.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.width - targetSize);
      const currDiff = Math.abs(curr.width - targetSize);
      return currDiff < prevDiff ? curr : prev;
    });
  };

  const getImageUrl = (member: Person) => {
    if (!member.profile_image?.sources) {
      return '';
    }
    const source = getClosestImageSource(member.profile_image.sources, 40);
    if (!source) {
      return '';
    }
    return source.url.replace('{{BUCKET_ROOT_PUBLIC}}', import.meta.env.VITE_BUCKET_ROOT_PUBLIC || '');
  };

  const handleImageError = (memberId: string) => {
    setFailedImages(prev => new Set([...prev, memberId]));
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">Members Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <select
                value={filters.period}
                onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value={MemberType.CO_INVESTOR}>Co-investors</option>
                <option value={MemberType.CO_CREATOR}>Co-creators</option>
                <option value={MemberType.INTERNAL}>Internal</option>
              </select>
            </div>
            <div className="glass-panel px-4 py-2 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <select
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                className="bg-transparent border-none text-sm focus:outline-none"
              >
                <option value="all">All Countries</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="sg">Singapore</option>
                <option value="kr">South Korea</option>
                <option value="es">Spain</option>
              </select>
            </div>
          </div>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="text-[#B0B3BA] text-sm font-medium">
              <th className="text-left pb-4 w-[35%]">Member</th>
              <th className="text-left pb-4 w-[15%]">Type</th>
              <th className="text-left pb-4 w-[35%]">Country</th>
              <th className="text-left pb-4 w-[15%]">Committed Volume</th>
            </tr>
          </thead>
          <tbody className="font-light">
            {members.map((member) => (
              <tr 
                key={member.id} 
                className="border-t border-white/5 hover:bg-[#72A0D6]/5 transition-colors cursor-pointer"
                onClick={() => handleMemberClick(member.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMemberClick(member.id);
                  }
                }}
              >
                <td className="py-4 w-[35%]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-[#72A0D6]/30 transition-all duration-300">
                      {getImageUrl(member) && !failedImages.has(member.id) ? (
                        <img 
                          src={getImageUrl(member)} 
                          alt={getFullName(member)}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(member.id)}
                        />
                      ) : (
                        <InitialsAvatar
                          firstName={member.first_name}
                          lastName={member.last_name}
                        />
                      )}
                    </div>
                    <span className="font-medium">{getFullName(member)}</span>
                  </div>
                </td>
                <td className="py-4 w-[15%]">
                  <div className="flex items-center">
                    <div className={`${getMemberTypeColor(member.member_type)} font-medium`}>
                      {member.member_type || 'Unknown'}
                    </div>
                  </div>
                </td>
                <td className="py-4 w-[35%]">
                  <div className="flex items-center">
                    <span>{member.tax_residence || 'Unknown'}</span>
                  </div>
                </td>
                <td className="py-4 text-left w-[15%]">
                  <span className="text-white font-semibold text-lg">
                    ${getCommittedVolume(member)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
          <div className="text-sm text-[#B0B3BA]">
            Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, totalPersons)} of {totalPersons} members
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {getPageNumbers().map((number, index) => (
              number === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-[#B0B3BA]">...</span>
              ) : (
                <button
                  key={number}
                  onClick={() => handlePageChange(number as number)}
                  className={`glass-panel px-4 py-2 ${
                    currentPage === number ? 'bg-[#72A0D6]/20 text-white' : 'text-[#B0B3BA]'
                  } button-hover`}
                >
                  {number}
                </button>
              )
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="glass-panel p-2 disabled:opacity-50 button-hover"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#72A0D6]" />
                <span>{MemberType.CO_INVESTOR}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#28E0B9]" />
                <span>{MemberType.CO_CREATOR}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span>{MemberType.INTERNAL}</span>
              </div>
            </div>
            <div className="text-[#B0B3BA]">
              Total Members: {totalPersons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};