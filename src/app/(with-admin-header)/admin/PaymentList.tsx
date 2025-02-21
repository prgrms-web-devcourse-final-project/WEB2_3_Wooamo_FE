interface PaymentListProps {
  paymentTime: string;
  name: string;
  point: string;
  value: string;
}

export default function PaymentList({
  paymentTime,
  name,
  point,
  value,
}: PaymentListProps) {
  return (
    <div className="flex px-5 py-10 bg-site-white-70">
      <div className="flex-3">{paymentTime}</div>
      <div className="flex-1">{name}</div>
      <div className="flex-1">{point}</div>
      <div className="flex-1">{value}</div>
    </div>
  );
}
