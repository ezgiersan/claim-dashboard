import { z } from 'zod'
import { StatusEnum } from "../lib/status";


export const TowingStepSchema = z.object({
  title: z.literal('Towing Service'),
  status: StatusEnum,
  pickupLocation: z.string(),
  towingDate: z.string(),
})

export const ClaimNotificationStepSchema = z.object({
  title: z.literal('Claim Notification'),
  status: StatusEnum,
  dateTime: z.string(),
  reportType: z.string(),
  reasonForDamage: z.string(),
  reportingParty: z.string(),
  contact: z.string(),
})

export const AppraisalStepSchema = z.object({
  title: z.literal('Appraisal'),
  status: StatusEnum,
  expertAssignmentDate: z.string(),
  expertInfo: z.string(),
  contact: z.string(),
})

export const RentalStepSchema = z.object({
  title: z.literal('Substitute Rental Vehicle'),
  status: StatusEnum,
  vehicleDuration: z.string(),
  vehicleModel: z.string(),
  extraDuration: z.string(),
})

export const FileReviewStepSchema = z.object({
  title: z.literal('File Review'),
  status: StatusEnum,
  reviewReferralDate: z.string(),
  reviewCompletionDate: z.string(),
})

export const DeductionStepSchema = z.object({
  title: z.literal('Deduction Reason'),
  status: StatusEnum,
  actionRequired: z.string().optional(),
  occupationalDeduction: z.string(),
  appreciationDeduction: z.string(),
  policyDeductible: z.string(),
  nonDamageAmount: z.string(),
})

export const PaymentStepSchema = z.object({
  title: z.literal('Payment Information'),
  status: StatusEnum,
  paidTo: z.string(),
  iban: z.string(),
  paymentAmount: z.string(),
  note: z.string().optional(),
})

export const ClosedStepSchema = z.object({
  title: z.literal('Closed'),
  status: StatusEnum,
  completionDate: z.string(),
})

export const NoteStepSchema = z.object({
  title: z.literal('Note'),
  status: z.literal('Note'),
  content: z.string(),
  id: z.string(),
})

export const AttachmentStepSchema = z.object({
  title: z.literal('Attachment'),
  status: z.literal('Attachment'),
  fileName: z.string(),
  id: z.string(),
})

export type Status =
  | "Completed"
  | "Report Completed"
  | "In Progress"
  | "Pending"
  | "Note"
  | "Attachment";


export const ProcessDetailSchema = z.discriminatedUnion('title', [
  TowingStepSchema,
  ClaimNotificationStepSchema,
  AppraisalStepSchema,
  RentalStepSchema,
  FileReviewStepSchema,
  DeductionStepSchema,
  PaymentStepSchema,
  ClosedStepSchema,
  NoteStepSchema,
  AttachmentStepSchema,
])

export const ClaimSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  processDetails: z.array(ProcessDetailSchema),
})

export type ProcessDetail = z.infer<typeof ProcessDetailSchema>
export type Claim = z.infer<typeof ClaimSchema>
export type TowingStep = z.infer<typeof TowingStepSchema>
export type ClaimNotificationStep = z.infer<typeof ClaimNotificationStepSchema>
export type AppraisalStep = z.infer<typeof AppraisalStepSchema>
export type RentalStep = z.infer<typeof RentalStepSchema>
export type FileReviewStep = z.infer<typeof FileReviewStepSchema>
export type DeductionStep = z.infer<typeof DeductionStepSchema>
export type PaymentStep = z.infer<typeof PaymentStepSchema>
export type ClosedStep = z.infer<typeof ClosedStepSchema>
export type NoteStep = z.infer<typeof NoteStepSchema>
export type AttachmentStep = z.infer<typeof AttachmentStepSchema>