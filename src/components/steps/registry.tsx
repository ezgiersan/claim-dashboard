import { ProcessDetail } from '../../types/claim'
import TowingStep from './TowingStep'
import ClaimNotificationStep from './ClaimNotificationStep'
import AppraisalStep from './AppraisalStep'
import RentalStep from './RentalStep'
import FileReviewStep from './FileReviewStep'
import DeductionStep from './DeductionStep'
import PaymentStep from './PaymentStep'
import ClosedStep from './ClosedStep'
import NoteStep from './NoteStep'
import AttachmentStep from './AttachmentStep'
import GenericStep from './GenericStep'


type StepComponent = React.FC<{ data: ProcessDetail; onRemove?: () => void }>

const registry: Record<string, StepComponent> = {
  'Towing Service': TowingStep as StepComponent,
  'Claim Notification': ClaimNotificationStep as StepComponent,
  'Appraisal': AppraisalStep as StepComponent,
  'Substitute Rental Vehicle': RentalStep as StepComponent,
  'File Review': FileReviewStep as StepComponent,
  'Deduction Reason': DeductionStep as StepComponent,
  'Payment Information': PaymentStep as StepComponent,
  'Closed': ClosedStep as StepComponent,
  'Note': NoteStep as StepComponent,
  'Attachment': AttachmentStep as StepComponent,
}

export function getStepComponent(title: string): StepComponent {
  return registry[title] ?? GenericStep
}