import React from 'react';

interface InitialsAvatarProps {
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  firstName = '',
  lastName = '',
  size = 'md',
  className = ''
}) => {
  const getInitials = () => {
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
        bg-gradient-to-br
        from-[#72A0D6]
        to-[#28E0B9]
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