import FeatureProvider from './FeatureProvider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-main">
      <FeatureProvider children={children} />
    </div>
  );
}
