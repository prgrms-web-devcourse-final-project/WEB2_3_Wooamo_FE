interface PaymentListProps {
  paymentTime: string;
  name: string;
  point: number;
  value: number;
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
      <div className="flex-1">{point.toLocaleString()}</div>
      <div className="flex-1">{value.toLocaleString()}</div>
    </div>
  );
}
