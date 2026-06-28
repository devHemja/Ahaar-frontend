import { UserCircle } from 'lucide-react';
import PlaceholderPage from '../components/PlaceholderPage';

export default function ProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      icon={UserCircle}
      message="Account details, location settings, and donation history will be editable from here."
    />
  );
}
