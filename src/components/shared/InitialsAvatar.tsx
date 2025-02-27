import React from 'react';
import { LocalizedString } from '../../models/interfaces/LocalizedString';

interface InitialsAvatarProps {
  firstName?: string;
  lastName?: string;
  title?: LocalizedString;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  firstName = '',
  lastName = '',
  title,
  size = 'md',
  className = ''
}) => {
  const getInitials = () => {
    if (title?.localizedValue?.['en']) {
      // Handle title case - take first letter of each word
      return title.localizedValue['en']
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') || '?';
    }
    // Handle first/last name case
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}` || '?';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  return (
    <div 
      className={`
        ${getSizeClasses()}
        rounded-full
        bg-[#72A0D6]
        flex
        items-center
        justify-center
        text-white
        font-medium
        ${className}
      `}
    >
      {getInitials()}
    </div>
  );
}; 