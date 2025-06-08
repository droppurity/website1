
import PlanSelectionSection from '@/components/droppurity/PlanSelectionSection';

export default function DroppurityPlansPage() {
  return (
    // min-h-screen ensures that if content is short, the background color still fills the viewport.
    // PlanSelectionSection will manage its own internal layout.
    <div className="min-h-screen"> 
      <PlanSelectionSection headerVisible={false} />
    </div>
  );
}
