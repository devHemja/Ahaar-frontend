import { Truck } from 'lucide-react';
import PlaceholderPage from '../components/PlaceholderPage';

export default function TrackDeliveryPage() {
  return (
    <PlaceholderPage
      title="Track Delivery"
      icon={Truck}
      message="Live status tracking for your claimed listings — Pending → Matched → In Transit → Delivered — will live here."
    />
  );
}
