const PaymentRow = ({ payment }) => {
  return (
    <tr className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition'>
      {/* Transaction ID */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-700 font-medium truncate max-w-[180px]'>
          {payment?.transactionId}
        </p>
      </td>

      {/* Tutor Email */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>{payment?.tutorEmail}</p>
      </td>

      {/* Amount */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <span className='font-semibold text-blue-600'>
          ৳ {payment?.amount}
        </span>
      </td>

      {/* Date */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <p className='text-gray-600'>
          {new Date(payment?.date).toLocaleDateString()}
        </p>
      </td>

      {/* Status */}
      <td className='px-5 py-4 border-b border-gray-200 text-sm'>
        <span className='px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700'>
          Paid
        </span>
      </td>
    </tr>
  )
}

export default PaymentRow
