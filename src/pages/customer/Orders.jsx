import { useState, useEffect, useRef } from "react";
import { 
  Package, 
  X, 
  Star, 
  MapPin, 
  Truck, 
  CheckCircle, 
  Clock, 
  Check, 
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ClipboardClock
} from "lucide-react";
import capImage from "../../assets/placeholder-caps.jpg";
import shirtImage from "../../assets/placeholder-shirt.jpg";
import shortsImage from "../../assets/shorts.jpg";
import topImage from "../../assets/placeholder-sleeves.jpg";

function Orders() {
  const [activeTab, setActiveTab] = useState("Return Order");
  const [currentPage, setCurrentPage] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [trackView, setTrackView] = useState(false);
  const [returnView, setReturnView] = useState(false);
  const [returnReasonsMap, setReturnReasonsMap] = useState({});

  const reviewModalRef = useRef(null);

  const tabs = [
    { id: "All Orders", label: "All Orders", icon: Package },
    { id: "Delivered Orders", label: "Delivered Orders", icon: CheckCircle },
    { id: "Pending Orders", label: "Pending Orders", icon: Clock },
    { id: "Review Orders", label: "Review Orders", icon: Star },
    { id: "Return Order", label: "Return Order", icon: RotateCcw },
  ];

  const returnReasonsList = [
    { value: "wrong_item", label: "Wrong item received" },
    { value: "damaged", label: "Item damaged/defective" },
    { value: "not_as_described", label: "Not as described" },
    { value: "changed_mind", label: "Changed my mind" },
    { value: "size_issue", label: "Size/fit issue" },
    { value: "other", label: "Other" },
  ];

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      status: "Delivered",
      items: [
        { id: 1, name: "Dynasteez Cap", qty: 2, price: 40000, image: capImage },
        { id: 2, name: "Dynasteez Shirt", qty: 3, price: 60000, image: shirtImage },
        { id: 3, name: "Dynasteez Short", qty: 1, price: 30000, image: shortsImage },
        { id: 4, name: "Dynasteez Top", qty: 2, price: 50000, image: topImage },
      ],
      subtotal: 180000,
      delivery: 2000,
      tax: 500,
      total: 182500,
      canReview: true,
      canReturn: false,
      canTrack: true,
      customer: {
        name: "Okonkwo Emmanuel",
        address: "12 Admiralty Way, Lekki Phase 1, Lagos State.",
        phone: "+234 9034234303",
      },
      trackingSteps: [
        { 
          title: "Order has been placed", 
          description: "Your order has been successfully placed, and we are currently awaiting payment confirmation to begin processing it.",
          date: "Apr 7, 2026", 
          time: "9:00am", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Payment Received", 
          description: "We have received your payment, and everything is now set as we begin preparing your order for confirmation.",
          date: "Apr 7, 2026", 
          time: "12:00pm", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order has been confirmed", 
          description: "Thank you for your purchase, your order has been confirmed and is currently being prepared for pick up.",
          date: "Apr 8, 2026", 
          time: "2:00pm", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order has been sent out", 
          description: "Your order has been picked up and is now out for delivery, heading directly to you.",
          date: "Apr 9, 2026", 
          time: "8:00am", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order Delivered", 
          description: "Your order has been completed and delivered to your location, marking the successful end of the delivery journey.",
          date: "Apr 11, 2026", 
          time: "5:00pm", 
          completed: true, 
          color: "bg-blue-500" 
        },
      ],
    },
    {
      id: "ORD-002",
      status: "Pending",
      items: [
        { id: 1, name: "Dynasteez Cap", qty: 2, price: 40000, image: capImage },
        { id: 2, name: "Dynasteez Shirt", qty: 3, price: 60000, image: shirtImage },
      ],
      subtotal: 100000,
      delivery: 1000,
      tax: 0,
      total: 101000,
      canReview: true,
      canReturn: false,
      canTrack: true,
      customer: {
        name: "Okonkwo Emmanuel",
        address: "12 Admiralty Way, Lekki Phase 1, Lagos State.",
        phone: "+234 9034234303",
      },
      trackingSteps: [
        { 
          title: "Order has been placed", 
          description: "Your order has been successfully placed, and we are currently awaiting payment confirmation to begin processing it.",
          date: "Apr 25, 2026", 
          time: "11:00 AM", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Payment Received", 
          description: "We have received your payment, and everything is now set as we begin preparing your order for confirmation.",
          date: "Apr 25, 2026", 
          time: "03:30 PM", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order has been confirmed", 
          description: "Thank you for your purchase, your order has been confirmed and is currently being prepared for pick up.",
          date: "Apr 26, 2026", 
          time: "10:00 AM", 
          completed: true, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order has been sent out", 
          description: "Your order has been picked up and is now out for delivery, heading directly to you.",
          date: "Apr 27, 2026", 
          time: "07:45 AM", 
          completed: false, 
          color: "bg-blue-500" 
        },
        { 
          title: "Order Delivered", 
          description: "Your order has been completed and delivered to your location, marking the successful end of the delivery journey.",
          date: "", 
          time: "", 
          completed: false, 
          color: "bg-blue-500" 
        },
      ],
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reviewModalRef.current && !reviewModalRef.current.contains(event.target)) {
        setShowReviewModal(false);
      }
    };

    if (showReviewModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReviewModal]);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "All Orders") return true;
    if (activeTab === "Delivered Orders") return order.status === "Delivered";
    if (activeTab === "Pending Orders") return order.status === "Pending";
    if (activeTab === "Review Orders") return order.canReview;
    if (activeTab === "Return Order") return order.canReturn;
    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => a.items.length - b.items.length);

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setReviewForm({ rating: 0, comment: "" });
    setShowReviewModal(true);
  };

  const openReturnView = (order) => {
    setSelectedOrder(order);
    setReturnReasonsMap({});
    setReturnView(true);
  };

  const openTrackView = (order) => {
    setSelectedOrder(order);
    setTrackView(true);
  };

  const goBack = () => {
    setTrackView(false);
    setReturnView(false);
    setSelectedOrder(null);
    setReturnReasonsMap({});
  };

  const handleReasonChange = (itemId, reasonValue) => {
    setReturnReasonsMap((prev) => ({
      ...prev,
      [itemId]: reasonValue,
    }));
  };

  const handleSubmitReturn = () => {
    const selectedItems = selectedOrder.items
      .filter((item) => returnReasonsMap[item.id])
      .map((item) => ({
        itemId: item.id,
        name: item.name,
        reason: returnReasonsMap[item.id],
        reasonLabel: returnReasonsList.find((r) => r.value === returnReasonsMap[item.id])?.label,
      }));

    if (selectedItems.length === 0) {
      alert("Please select a reason for at least one item.");
      return;
    }

    console.log("Return requested:", {
      orderId: selectedOrder.id,
      items: selectedItems,
    });

    setReturnView(false);
    setSelectedOrder(null);
    setReturnReasonsMap({});
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", reviewForm);
    setShowReviewModal(false);
  };

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString()}`;
  };

  const totalPages = 1;

  const buttonBaseStyle = "px-6 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all duration-200";

  const OrderCard = ({ order }) => (
    <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-end gap-3 p-4 border-b border-gray-100">
        {order.canTrack && (
          <button
            onClick={() => openTrackView(order)}
            className={buttonBaseStyle}
          >
            Track
          </button>
        )}
        {order.canReturn && (
          <button
            onClick={() => openReturnView(order)}
            className={buttonBaseStyle}
          >
            Return
          </button>
        )}
        <button className={buttonBaseStyle}>
          Buy Again
        </button>
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Qty: x{item.qty}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-gray-900 font-medium">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery:</span>
            <span className="text-gray-900 font-medium">{formatPrice(order.delivery)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax:</span>
            <span className="text-gray-900 font-medium">{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-100">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Return Order Page View
  if (returnView && selectedOrder) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        {/* RETURN Header */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-widest uppercase">RETURN</h1>
        </div>

        {/* Return Items Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">Product & Quantity</div>
            <div className="text-sm font-medium text-gray-900 text-center">Price</div>
            <div className="text-sm font-medium text-gray-900 text-right">Reason for return</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="grid grid-cols-3 gap-4 px-6 py-4 items-center">
                {/* Product & Quantity */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: ×{item.qty}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}</p>
                </div>

                {/* Reason Dropdown */}
                <div className="flex justify-end">
                  <div className="relative w-full max-w-[200px]">
                    <select
                      value={returnReasonsMap[item.id] || ""}
                      onChange={(e) => handleReasonChange(item.id, e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 appearance-none cursor-pointer transition-all"
                    >
                      <option value="" disabled>
                        Select reason
                      </option>
                      {returnReasonsList.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Return Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitReturn}
            className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Submit Return
          </button>
        </div>
      </div>
    );
  }

  // Track Order Page View
  if (trackView && selectedOrder) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        {/* TRACK Header */}
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-widest uppercase">TRACK</h1>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">Order ID {selectedOrder.id}</p>
              <p className="text-sm font-medium text-green-600">{selectedOrder.status}</p>
              <p className="text-sm text-gray-500">
                {selectedOrder.trackingSteps[0]?.date}, {selectedOrder.trackingSteps[0]?.time}
              </p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-900">{selectedOrder.customer.name}</p>
              <p className="text-gray-500">{selectedOrder.customer.address}</p>
              <p className="text-gray-500">{selectedOrder.customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-base font-semibold text-gray-900 mb-6">Order Timeline</h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-200" />
            
            <div className="space-y-8">
              {selectedOrder.trackingSteps.map((step, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Blue Dot */}
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 z-10 bg-blue-500 ${
                    step.completed ? "opacity-100" : "opacity-40"
                  }`} />

                  <div className="flex-1 -mt-1">
                    <h4 className={`text-sm font-semibold ${
                      step.completed ? "text-gray-900" : "text-gray-400"
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      step.completed ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.description}
                    </p>
                    {step.date && step.time && (
                      <p className="text-[11px] text-gray-400 mt-1">
                        {step.date}, {step.time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const EmptyState = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-[20px] flex flex-col items-center justify-center" style={{ width: 929, height: 404 }}>
        <ClipboardClock className="w-20 h-20 text-gray-300 stroke-[1]" />
        <p className="text-gray-400 text-sm mt-4">This is empty</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Orders</h1>
      </div>

      {/* Tabs with Icons */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex justify-between overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 text-center px-4 py-2.5 text-sm font-medium transition-all duration-200 relative whitespace-nowrap ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {sortedOrders.length === 0 ? (
          <EmptyState />
        ) : (
          sortedOrders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm font-medium">
          {currentPage}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div ref={reviewModalRef} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: x{item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1 transition-colors"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewForm.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 hover:text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                  rows={4}
                  placeholder="Share your experience with this product..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={reviewForm.rating === 0}
                className="flex-1 px-4 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;