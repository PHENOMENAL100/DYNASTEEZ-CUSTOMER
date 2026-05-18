// import { useState } from "react";
// import { Truck, RotateCcw, Banknote, CreditCard, Crown } from "lucide-react";

// function Policy() {
//   const [activeTab, setActiveTab] = useState("Shipping Info");

//   const tabs = [
//     { id: "Shipping Info", label: "Shipping Info", icon: <Truck size={18} strokeWidth={1.5} /> },
//     { id: "Return Policy", label: "Return Policy", icon: <RotateCcw size={18} strokeWidth={1.5} /> },
//     { id: "Refund Policy", label: "Refund Policy", icon: <Banknote size={18} strokeWidth={1.5} /> },
//     { id: "Payment Method", label: "Payment Method", icon: <CreditCard size={18} strokeWidth={1.5} /> },
//     { id: "DSC VIP Terms & Conditions", label: "DSC VIP Terms & Conditions", icon: <Crown size={18} strokeWidth={1.5} /> },
//   ];

//   const ReturnPolicyContent = () => (
//     <div className="space-y-4">
//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">How long does it take to make a return?</h3>
//         <p className="text-sm text-gray-600 leading-relaxed mb-3">
//           At Dynasteez, customer satisfaction is important to us. If you are not completely satisfied with your order, you may request a return within 7 days of receiving your item.
//         </p>
//         <p className="text-sm text-gray-500">
//           Note: Customers are responsible for return shipping costs unless the item received was defective or incorrect.
//         </p>
//       </div>

//       <h3 className="text-base font-semibold text-gray-900 px-1">What items do I return?</h3>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h4 className="text-sm font-semibold text-gray-900 mb-3">Non-Returnable Items</h4>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Customized or personalized products.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Sale or discounted items.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Gift cards.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Items damaged due to misuse or improper handling.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h4 className="text-sm font-semibold text-gray-900 mb-3">Returnable Items</h4>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Items must be unused, unworn, unwashed, and in their original condition.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             All original tags and packaging must be intact.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Proof of purchase or order confirmation is required.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">How do I return an item?</h3>
//         <h4 className="text-sm font-semibold text-gray-900 mb-3">Return Process</h4>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Contact our support team via email or website contact form.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Provide your order number and reason for return.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Once approved, return instructions will be provided.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <p className="text-sm text-gray-500 mb-1">Note:</p>
//         <p className="text-sm text-gray-600 mb-4">
//           Customers are responsible for return shipping costs unless the item received was defective or incorrect.
//         </p>
//         <h4 className="text-sm font-semibold text-gray-900 mb-2">Damaged or Incorrect Orders</h4>
//         <p className="text-sm text-gray-600 mb-4">
//           If you receive a damaged, defective, or wrong item, please contact us within 48 hours of delivery with clear photos of the product and packaging.
//         </p>
//         <h4 className="text-sm font-semibold text-gray-900 mb-2">Return Approval</h4>
//         <p className="text-sm text-gray-600">
//           Once your return is received and inspected, we will notify you regarding the approval or rejection of your return.
//         </p>
//       </div>
//     </div>
//   );

//   const RefundPolicyContent = () => (
//     <div className="space-y-4">
//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Refund Eligibility</h3>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Approved return products.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Defective products.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Incorrect items sent by Dynasteez.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Orders cancelled before shipment.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">How do I make a refund?</h3>
//         <h4 className="text-sm font-semibold text-gray-900 mb-2">Refund Process</h4>
//         <p className="text-sm text-gray-600 mb-2">Once your return is approved:</p>
//         <p className="text-sm text-gray-600 mb-2">Refunds will be processed to the original payment method.</p>
//         <p className="text-sm text-gray-600">
//           Please allow 5–10 business days for the refund to reflect depending on your bank or payment provider.
//         </p>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Late or Missing Refunds</h3>
//         <p className="text-sm text-gray-600 font-medium mb-3">If you have not received your refund after the processing period:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Check your bank account again
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Contact your card provider or bank
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Reach out to our support team for assistance
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <p className="text-sm text-gray-500 mb-1">Note:</p>
//         <h4 className="text-sm font-semibold text-gray-900 mb-1">Shipping Fees</h4>
//         <p className="text-sm text-gray-600">
//           Original shipping fees are non-refundable unless the return is due to an error on our part.
//         </p>
//       </div>
//     </div>
//   );

//   const PaymentMethodContent = () => (
//     <div className="space-y-4">
//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Pay with Card</h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           Pay securely and conveniently using your debit or credit card. Dynasteez ensures fast, safe, and seamless transactions, giving you a smooth checkout experience every time you shop.
//         </p>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Pay with Bank Transfer</h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           Pay conveniently through direct bank transfer for a secure and reliable checkout experience. Once your payment is confirmed, your order will be processed immediately.
//         </p>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Currencies</h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           Dynasteez supports multiple currencies to make shopping easier and more convenient for customers worldwide. Payments can currently be made in Naira (₦), US Dollars ($), Euros (€), and British Pounds (£).
//         </p>
//       </div>
//     </div>
//   );

//   const DSCVIPContent = () => (
//     <div className="space-y-4">
//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Dynasteez VIP Membership Eligibility</h3>
//         <p className="text-sm text-gray-600 mb-2">To become a Dynasteez VIP member:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             You must register through the official Dynasteez platform.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             You must provide accurate and complete information during registration.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Dynasteez reserves the right to approve, suspend, or terminate VIP membership at its discretion.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">VIP Membership</h3>
//         <p className="text-sm text-gray-600 mb-2">VIP members may receive:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Early access to new drops and collections.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Exclusive discounts and promotions.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Priority order processing.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Access to limited edition products.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Special member-only events, content, or offers.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Membership Rules</h3>
//         <p className="text-sm text-gray-600 mb-2">By participating in the VIP program, members agree:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Not to misuse discount codes or promotional offers.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Not to share exclusive VIP access links or benefits for unauthorized use.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             To maintain respectful conduct within the Dynasteez community.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Payments & Subscriptions</h3>
//         <p className="text-sm text-gray-600 mb-2">If the VIP membership includes a paid subscription:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Payments must be completed through approved payment methods.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Membership fees are non-refundable unless stated otherwise.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Failure to complete recurring payments may result in loss of VIP access.
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Cancellation & Termination</h3>
//         <p className="text-sm text-gray-600 mb-3">
//           Members may cancel their VIP membership at any time through their account settings or by contacting support. Dynasteez reserves the right to terminate or suspend VIP access if:
//         </p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Fraudulent activity is detected
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Terms are violated
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Misuse of benefits occurs
//           </li>
//         </ul>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Intellectual Property</h3>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           All exclusive VIP content, previews, media, and product releases remain the property of Dynasteez and may not be copied, redistributed, or resold without permission.
//         </p>
//       </div>

//       <div className="border border-gray-200 rounded-xl p-6">
//         <h3 className="text-base font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
//         <p className="text-sm text-gray-600 mb-2">Dynasteez is not responsible for:</p>
//         <ul className="space-y-2">
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Technical interruptions affecting VIP access.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Delays in product releases or deliveries.
//           </li>
//           <li className="text-sm text-gray-600 flex items-start gap-2">
//             <span className="text-gray-400 mt-1">•</span>
//             Third-party payment or service provider issues.
//           </li>
//         </ul>
//       </div>
//     </div>
//   );

//   const ShippingInfoContent = () => (
//     <div className="flex items-center justify-center min-h-[300px]">
//       <p className="text-sm text-gray-400">Shipping information coming soon.</p>
//     </div>
//   );

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Shipping Info": return <ShippingInfoContent />;
//       case "Return Policy": return <ReturnPolicyContent />;
//       case "Refund Policy": return <RefundPolicyContent />;
//       case "Payment Method": return <PaymentMethodContent />;
//       case "DSC VIP Terms & Conditions": return <DSCVIPContent />;
//       default: return <ShippingInfoContent />;
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-xl font-semibold text-gray-900 mb-6">Policy</h1>

//       {/* Tab Bar Card */}
//       <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="flex items-center border-b border-gray-200 px-2 overflow-x-auto">
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 px-5 py-4 text-sm transition-colors relative whitespace-nowrap ${
//                   isActive
//                     ? "text-gray-900 font-medium"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab.icon}
//                 <span>{tab.label}</span>
//                 {isActive && (
//                   <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-gray-900 rounded-full" />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="mt-4 bg-white rounded-2xl border border-gray-200 min-h-[400px] p-6 md:p-8">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default Policy;
import { useState } from "react";
import { Truck, RotateCcw, Banknote, CreditCard, Crown } from "lucide-react";

function Policy() {
  const [activeTab, setActiveTab] = useState("Shipping Info");

  const tabs = [
    { id: "Shipping Info", label: "Shipping Info", icon: <Truck size={18} strokeWidth={1.5} /> },
    { id: "Return Policy", label: "Return Policy", icon: <RotateCcw size={18} strokeWidth={1.5} /> },
    { id: "Refund Policy", label: "Refund Policy", icon: <Banknote size={18} strokeWidth={1.5} /> },
    { id: "Payment Method", label: "Payment Method", icon: <CreditCard size={18} strokeWidth={1.5} /> },
    { id: "DSC VIP Terms & Conditions", label: "DSC VIP Terms & Conditions", icon: <Crown size={18} strokeWidth={1.5} /> },
  ];

  const ReturnPolicyContent = () => (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">How long does it take to make a return?</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          At Dynasteez, customer satisfaction is important to us. If you are not completely satisfied with your order, you may request a return within 7 days of receiving your item.
        </p>
        <p className="text-sm text-gray-500">
          Note: Customers are responsible for return shipping costs unless the item received was defective or incorrect.
        </p>
      </div>

      <h3 className="text-base font-semibold text-gray-900 px-1">What items do I return?</h3>

      <div className="border border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Non-Returnable Items</h4>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Customized or personalized products.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Sale or discounted items.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Gift cards.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Items damaged due to misuse or improper handling.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Returnable Items</h4>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Items must be unused, unworn, unwashed, and in their original condition.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            All original tags and packaging must be intact.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Proof of purchase or order confirmation is required.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">How do I return an item?</h3>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Return Process</h4>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Contact our support team via email or website contact form.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Provide your order number and reason for return.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Once approved, return instructions will be provided.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-500 mb-1">Note:</p>
        <p className="text-sm text-gray-600 mb-4">
          Customers are responsible for return shipping costs unless the item received was defective or incorrect.
        </p>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Damaged or Incorrect Orders</h4>
        <p className="text-sm text-gray-600 mb-4">
          If you receive a damaged, defective, or wrong item, please contact us within 48 hours of delivery with clear photos of the product and packaging.
        </p>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Return Approval</h4>
        <p className="text-sm text-gray-600">
          Once your return is received and inspected, we will notify you regarding the approval or rejection of your return.
        </p>
      </div>
    </div>
  );

  const RefundPolicyContent = () => (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Refund Eligibility</h3>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Approved return products.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Defective products.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Incorrect items sent by Dynasteez.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Orders cancelled before shipment.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">How do I make a refund?</h3>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Refund Process</h4>
        <p className="text-sm text-gray-600 mb-2">Once your return is approved:</p>
        <p className="text-sm text-gray-600 mb-2">Refunds will be processed to the original payment method.</p>
        <p className="text-sm text-gray-600">
          Please allow 5–10 business days for the refund to reflect depending on your bank or payment provider.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Late or Missing Refunds</h3>
        <p className="text-sm text-gray-600 font-medium mb-3">If you have not received your refund after the processing period:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Check your bank account again
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Contact your card provider or bank
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Reach out to our support team for assistance
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <p className="text-sm text-gray-500 mb-1">Note:</p>
        <h4 className="text-sm font-semibold text-gray-900 mb-1">Shipping Fees</h4>
        <p className="text-sm text-gray-600">
          Original shipping fees are non-refundable unless the return is due to an error on our part.
        </p>
      </div>
    </div>
  );

  const PaymentMethodContent = () => (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Pay with Card</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Pay securely and conveniently using your debit or credit card. Dynasteez ensures fast, safe, and seamless transactions, giving you a smooth checkout experience every time you shop.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Pay with Bank Transfer</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Pay conveniently through direct bank transfer for a secure and reliable checkout experience. Once your payment is confirmed, your order will be processed immediately.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Currencies</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Dynasteez supports multiple currencies to make shopping easier and more convenient for customers worldwide. Payments can currently be made in Naira (₦), US Dollars ($), Euros (€), and British Pounds (£).
        </p>
      </div>
    </div>
  );

  const DSCVIPContent = () => (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="text-yellow-400" size={24} />
            <span className="text-yellow-400 font-semibold tracking-wide text-sm uppercase">Exclusive Access</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">DSC VIP Membership</h3>
          <p className="text-gray-300 max-w-lg">Join our premium loyalty program for early access to drops, exclusive pricing, and member-only events. Free to join, lifetime benefits.</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Dynasteez VIP Membership Eligibility</h3>
        <p className="text-sm text-gray-600 mb-2">To become a Dynasteez VIP member:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            You must register through the official Dynasteez platform.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            You must provide accurate and complete information during registration.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Dynasteez reserves the right to approve, suspend, or terminate VIP membership at its discretion.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">VIP Membership</h3>
        <p className="text-sm text-gray-600 mb-2">VIP members may receive:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Early access to new drops and collections.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Exclusive discounts and promotions.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Priority order processing.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Access to limited edition products.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Special member-only events, content, or offers.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Membership Rules</h3>
        <p className="text-sm text-gray-600 mb-2">By participating in the VIP program, members agree:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Not to misuse discount codes or promotional offers.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Not to share exclusive VIP access links or benefits for unauthorized use.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            To maintain respectful conduct within the Dynasteez community.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Payments & Subscriptions</h3>
        <p className="text-sm text-gray-600 mb-2">If the VIP membership includes a paid subscription:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Payments must be completed through approved payment methods.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Membership fees are non-refundable unless stated otherwise.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Failure to complete recurring payments may result in loss of VIP access.
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Cancellation & Termination</h3>
        <p className="text-sm text-gray-600 mb-3">
          Members may cancel their VIP membership at any time through their account settings or by contacting support. Dynasteez reserves the right to terminate or suspend VIP access if:
        </p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Fraudulent activity is detected
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Terms are violated
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Misuse of benefits occurs
          </li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Intellectual Property</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          All exclusive VIP content, previews, media, and product releases remain the property of Dynasteez and may not be copied, redistributed, or resold without permission.
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
        <p className="text-sm text-gray-600 mb-2">Dynasteez is not responsible for:</p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Technical interruptions affecting VIP access.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Delays in product releases or deliveries.
          </li>
          <li className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-gray-400">•</span>
            Third-party payment or service provider issues.
          </li>
        </ul>
      </div>
    </div>
  );

  const ShippingInfoContent = () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <p className="text-sm text-gray-400">Shipping information coming soon.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Shipping Info": return <ShippingInfoContent />;
      case "Return Policy": return <ReturnPolicyContent />;
      case "Refund Policy": return <RefundPolicyContent />;
      case "Payment Method": return <PaymentMethodContent />;
      case "DSC VIP Terms & Conditions": return <DSCVIPContent />;
      default: return <ShippingInfoContent />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Policy</h1>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex items-center border-b border-gray-200 px-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm transition-colors relative whitespace-nowrap ${
                  isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-gray-900 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl border border-gray-200 min-h-[400px] p-6 md:p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default Policy;