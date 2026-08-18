import AuthoritarianSteps from './authoritarian-steps';
import { Skeleton } from '../../ui/skeleton';
import { User } from '../../../types/user.types';
import { Button } from '../../ui/button';
import { Link } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';

const NavUser = ({ user, isLoading }: { user: User | undefined; isLoading: boolean }) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-9 w-11 rounded-lg sm:!w-20" />
      ) : user ? (
        <Link to={'/my-account/dashboard'}>
          <Button variant={'mainShaded'}>
            <span className="hidden sm:inline">پنل کاربری</span>
            <UserIcon />
          </Button>
        </Link>
      ) : (
        <AuthoritarianSteps />
      )}
    </div>
  );
};

export default NavUser;
