import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type TopbarProps = {
  onClose?: () => void;
  forceHide?: boolean;
};

const Topbar = ({ onClose, forceHide = false }: TopbarProps) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (forceHide) setVisible(false);
  }, [forceHide]);

  if (!visible) return null;

  return (
    <>
      {showBanner && (
        <Link
          to={'/shop'}
          className="bg-main relative flex h-10 w-full items-center justify-center gap-4 px-3 sm:px-0"
        >
          <div className="relative inline-flex items-center justify-center gap-3">
            <img
              style={{ filter: 'invert(1)' }}
              src="/Images/ticket-percent.svg"
              className="relative size-6 transition-all"
            />
            <p className="text-center text-sm leading-[22px] font-bold text-white">
              ۳۰٪ تخفیف روی تمام محصولات — مدت محدود!
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default Topbar;

