import { PaymentStep as PaymentStepType } from '../../types/claim'

interface Props {
  data: PaymentStepType
}

function maskIban(iban: string) {
  return iban.slice(0, 6) + '*'.repeat(iban.length - 10) + iban.slice(-4)
}

export default function PaymentStep({ data }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{data.title}</p>
      <p className="text-xs text-muted-foreground">
        {data.paidTo} · {maskIban(data.iban)}
      </p>
      <p className="text-xs text-muted-foreground">
        Ödeme Tutarı: {data.paymentAmount}
      </p>
      {data.note && (
        <p className="text-xs text-muted-foreground">{data.note}</p>
      )}
    </div>
  )
}