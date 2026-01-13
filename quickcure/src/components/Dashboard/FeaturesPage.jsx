// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Shield, Truck, Clock, Bell, 
//   Package, CreditCard, Smartphone, Users,
//   Zap, Lock, BarChart, Settings,
//   CheckCircle, Star, Award, Target,
//   Gift, ShieldCheck, FileText, Globe,
//   ShieldOff, ShoppingBag, Tag, Percent
// } from 'lucide-react';

// const FeaturesPage = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
  
//   const features = [
//     {
//       id: 1,
//       title: 'Inventory Management',
//       description: 'Real-time stock tracking with automatic reorder alerts and batch management.',
//       icon: Package,
//       category: 'operations',
//       status: 'active',
//       plans: ['basic', 'pro', 'enterprise']
//     },
//     {
//       id: 2,
//       title: 'Smart Prescription',
//       description: 'Digital prescription processing with drug interaction alerts and dosage guidance.',
//       icon: FileText,
//       category: 'prescriptions',
//       status: 'active',
//       plans: ['pro', 'enterprise']
//     },
//     {
//       id: 3,
//       title: 'Patient Management',
//       description: 'Complete patient profiles with medical history and prescription tracking.',
//       icon: Users,
//       category: 'patients',
//       status: 'beta',
//       plans: ['pro', 'enterprise']
//     },
//     {
//       id: 4,
//       title: 'Billing & Insurance',
//       description: 'Automated insurance claims processing and electronic billing systems.',
//       icon: CreditCard,
//       category: 'finance',
//       status: 'active',
//       plans: ['basic', 'pro', 'enterprise']
//     },
//     {
//       id: 5,
//       title: 'Delivery Tracking',
//       description: 'Real-time delivery tracking with GPS and customer notifications.',
//       icon: Truck,
//       category: 'delivery',
//       status: 'coming-soon',
//       plans: ['pro', 'enterprise']
//     },
//     {
//       id: 6,
//       title: 'Security & Compliance',
//       description: 'HIPAA compliant data security with audit trails and access controls.',
//       icon: ShieldCheck,
//       category: 'security',
//       status: 'active',
//       plans: ['enterprise']
//     },
//     {
//       id: 7,
//       title: 'Analytics Dashboard',
//       description: 'Advanced analytics for sales trends, inventory forecasting, and performance metrics.',
//       icon: BarChart,
//       category: 'analytics',
//       status: 'active',
//       plans: ['pro', 'enterprise']
//     },
//     {
//       id: 8,
//       title: 'Mobile Pharmacy App',
//       description: 'Dedicated mobile app for customers to order medicines and track deliveries.',
//       icon: Smartphone,
//       category: 'mobile',
//       status: 'beta',
//       plans: ['enterprise']
//     },
//     {
//       id: 9,
//       title: 'Automated Alerts',
//       description: 'Smart notifications for stock shortages, prescription refills, and price changes.',
//       icon: Bell,
//       category: 'automation',
//       status: 'active',
//       plans: ['basic', 'pro', 'enterprise']
//     },
//     {
//       id: 10,
//       title: '24/7 Support',
//       description: 'Round-the-clock customer support with priority response for enterprise users.',
//       icon: Clock,
//       category: 'support',
//       status: 'active',
//       plans: ['pro', 'enterprise']
//     },
//     {
//       id: 11,
//       title: 'Multi-location Sync',
//       description: 'Sync inventory and operations across multiple pharmacy locations.',
//       icon: Globe,
//       category: 'operations',
//       status: 'coming-soon',
//       plans: ['enterprise']
//     },
//     {
//       id: 12,
//       title: 'Loyalty Program',
//       description: 'Customer loyalty rewards program with points and special discounts.',
//       icon: Gift,
//       category: 'marketing',
//       status: 'active',
//       plans: ['pro', 'enterprise']
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'All Features', count: features.length },
//     { id: 'operations', name: 'Operations', count: features.filter(f => f.category === 'operations').length },
//     { id: 'prescriptions', name: 'Prescriptions', count: features.filter(f => f.category === 'prescriptions').length },
//     { id: 'patients', name: 'Patient Care', count: features.filter(f => f.category === 'patients').length },
//     { id: 'finance', name: 'Finance', count: features.filter(f => f.category === 'finance').length },
//     { id: 'analytics', name: 'Analytics', count: features.filter(f => f.category === 'analytics').length },
//     { id: 'security', name: 'Security', count: features.filter(f => f.category === 'security').length },
//     { id: 'mobile', name: 'Mobile', count: features.filter(f => f.category === 'mobile').length }
//   ];

//   const filteredFeatures = activeCategory === 'all' 
//     ? features 
//     : features.filter(feature => feature.category === activeCategory);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'active': return 'bg-[#2c6774]/10 text-[#2c6774]';
//       case 'beta': return 'bg-[#5c878f]/10 text-[#5c878f]';
//       case 'coming-soon': return 'bg-[#c0d3dc]/30 text-gray-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   const getPlanBadgeColor = (plan) => {
//     switch(plan) {
//       case 'basic': return 'bg-[#9fbfc5] text-[#174047]';
//       case 'pro': return 'bg-[#5c878f] text-white';
//       case 'enterprise': return 'bg-[#174047] text-white';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Features</h1>
//         <p className="text-gray-600">Explore all the powerful features available in MediCare Pharmacy System</p>
//       </div>

//       {/* Category Filters */}
//       <div className="flex flex-wrap gap-2 mb-8">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => setActiveCategory(category.id)}
//             className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
//               activeCategory === category.id
//                 ? 'bg-gradient-to-r from-[#2c6774] to-[#174047] text-white'
//                 : 'bg-[#c0d3dc]/20 text-[#174047] hover:bg-[#c0d3dc]/30'
//             }`}
//           >
//             <span>{category.name}</span>
//             <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//               {category.count}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Features Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredFeatures.map((feature) => {
//           const Icon = feature.icon;
//           return (
//             <div 
//               key={feature.id} 
//               className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
//             >
//               <div className="p-6">
//                 {/* Feature Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-[#2c6774]/10 to-[#5c878f]/10">
//                     <Icon className="text-[#2c6774]" size={24} />
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
//                     {feature.status === 'coming-soon' ? 'Coming Soon' : feature.status}
//                   </span>
//                 </div>

//                 {/* Feature Content */}
//                 <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#2c6774] transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6">{feature.description}</p>

//                 {/* Plans Badges */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {feature.plans.map((plan) => (
//                     <span 
//                       key={plan} 
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(plan)}`}
//                     >
//                       {plan.charAt(0).toUpperCase() + plan.slice(1)}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   {feature.status === 'active' ? (
//                     <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2c6774] to-[#174047] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//                       Enable Feature
//                     </button>
//                   ) : feature.status === 'beta' ? (
//                     <button className="flex-1 px-4 py-2.5 bg-[#5c878f] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//                       Join Beta
//                     </button>
//                   ) : (
//                     <button className="flex-1 px-4 py-2.5 bg-[#c0d3dc]/30 text-gray-600 rounded-xl font-medium hover:bg-[#c0d3dc]/40 transition-all duration-200">
//                       Notify Me
//                     </button>
//                   )}
//                   <button className="px-4 py-2.5 bg-[#c0d3dc]/20 text-[#174047] rounded-xl font-medium hover:bg-[#c0d3dc]/30 transition-all duration-200">
//                     Learn More
//                   </button>
//                 </div>
//               </div>

//               {/* Feature Footer */}
//               <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle size={16} className="text-[#2c6774]" />
//                     <span className="text-sm text-gray-600">Fully Integrated</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Zap size={16} className="text-[#5c878f]" />
//                     <span className="text-sm text-gray-600">API Available</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Stats Section */}
//       <div className="mt-12 p-8 bg-gradient-to-r from-[#2c6774] to-[#174047] rounded-2xl">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="text-center">
//             <div className="text-4xl font-bold text-white mb-2">98%</div>
//             <div className="text-[#c0d3dc]">Customer Satisfaction</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-white mb-2">24/7</div>
//             <div className="text-[#c0d3dc]">Uptime Guarantee</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-white mb-2">99.9%</div>
//             <div className="text-[#c0d3dc]">Data Accuracy</div>
//           </div>
//           <div className="text-center">
//             <div className="text-4xl font-bold text-white mb-2">50+</div>
//             <div className="text-[#c0d3dc]">Active Features</div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="mt-8 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Feature?</h2>
//         <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//           Our team can develop custom features tailored to your pharmacy's specific needs.
//         </p>
//         <button className="px-6 py-3 bg-gradient-to-r from-[#5c878f] to-[#2c6774] text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
//           Request Custom Feature
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FeaturesPage;




















//-----------Pretty theme
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Truck, Clock, Bell, 
  Package, CreditCard, Smartphone, Users,
  Zap, Lock, BarChart, Settings,
  CheckCircle, Star, Award, Target,
  Gift, ShieldCheck, FileText, Globe,
  ShieldOff, ShoppingBag, Tag, Percent
} from 'lucide-react';

const FeaturesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const features = [
    {
      id: 1,
      title: 'Inventory Management',
      description: 'Real-time stock tracking with automatic reorder alerts and batch management.',
      icon: Package,
      category: 'operations',
      status: 'active',
      plans: ['basic', 'pro', 'enterprise']
    },
    {
      id: 2,
      title: 'Smart Prescription',
      description: 'Digital prescription processing with drug interaction alerts and dosage guidance.',
      icon: FileText,
      category: 'prescriptions',
      status: 'active',
      plans: ['pro', 'enterprise']
    },
    {
      id: 3,
      title: 'Patient Management',
      description: 'Complete patient profiles with medical history and prescription tracking.',
      icon: Users,
      category: 'patients',
      status: 'beta',
      plans: ['pro', 'enterprise']
    },
    {
      id: 4,
      title: 'Billing & Insurance',
      description: 'Automated insurance claims processing and electronic billing systems.',
      icon: CreditCard,
      category: 'finance',
      status: 'active',
      plans: ['basic', 'pro', 'enterprise']
    },
    {
      id: 5,
      title: 'Delivery Tracking',
      description: 'Real-time delivery tracking with GPS and customer notifications.',
      icon: Truck,
      category: 'delivery',
      status: 'coming-soon',
      plans: ['pro', 'enterprise']
    },
    {
      id: 6,
      title: 'Security & Compliance',
      description: 'HIPAA compliant data security with audit trails and access controls.',
      icon: ShieldCheck,
      category: 'security',
      status: 'active',
      plans: ['enterprise']
    },
    {
      id: 7,
      title: 'Analytics Dashboard',
      description: 'Advanced analytics for sales trends, inventory forecasting, and performance metrics.',
      icon: BarChart,
      category: 'analytics',
      status: 'active',
      plans: ['pro', 'enterprise']
    },
    {
      id: 8,
      title: 'Mobile Pharmacy App',
      description: 'Dedicated mobile app for customers to order medicines and track deliveries.',
      icon: Smartphone,
      category: 'mobile',
      status: 'beta',
      plans: ['enterprise']
    },
    {
      id: 9,
      title: 'Automated Alerts',
      description: 'Smart notifications for stock shortages, prescription refills, and price changes.',
      icon: Bell,
      category: 'automation',
      status: 'active',
      plans: ['basic', 'pro', 'enterprise']
    },
    {
      id: 10,
      title: '24/7 Support',
      description: 'Round-the-clock customer support with priority response for enterprise users.',
      icon: Clock,
      category: 'support',
      status: 'active',
      plans: ['pro', 'enterprise']
    },
    {
      id: 11,
      title: 'Multi-location Sync',
      description: 'Sync inventory and operations across multiple pharmacy locations.',
      icon: Globe,
      category: 'operations',
      status: 'coming-soon',
      plans: ['enterprise']
    },
    {
      id: 12,
      title: 'Loyalty Program',
      description: 'Customer loyalty rewards program with points and special discounts.',
      icon: Gift,
      category: 'marketing',
      status: 'active',
      plans: ['pro', 'enterprise']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', count: features.length },
    { id: 'operations', name: 'Operations', count: features.filter(f => f.category === 'operations').length },
    { id: 'prescriptions', name: 'Prescriptions', count: features.filter(f => f.category === 'prescriptions').length },
    { id: 'patients', name: 'Patient Care', count: features.filter(f => f.category === 'patients').length },
    { id: 'finance', name: 'Finance', count: features.filter(f => f.category === 'finance').length },
    { id: 'analytics', name: 'Analytics', count: features.filter(f => f.category === 'analytics').length },
    { id: 'security', name: 'Security', count: features.filter(f => f.category === 'security').length },
    { id: 'mobile', name: 'Mobile', count: features.filter(f => f.category === 'mobile').length }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'beta': return 'bg-amber-100 text-amber-800';
      case 'coming-soon': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPlanBadgeColor = (plan) => {
    switch(plan) {
      case 'basic': return 'bg-emerald-100 text-emerald-800';
      case 'pro': return 'bg-teal-100 text-teal-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Features</h1>
        <p className="text-gray-600">Explore all the powerful features available in MediCare Pharmacy System</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.name}</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div 
              key={feature.id} 
              className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Feature Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                    <Icon className="text-emerald-600" size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                    {feature.status === 'coming-soon' ? 'Coming Soon' : feature.status}
                  </span>
                </div>

                {/* Feature Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>

                {/* Plans Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {feature.plans.map((plan) => (
                    <span 
                      key={plan} 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(plan)}`}
                    >
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {feature.status === 'active' ? (
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                      Enable Feature
                    </button>
                  ) : feature.status === 'beta' ? (
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                      Join Beta
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
                      Notify Me
                    </button>
                  )}
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Feature Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    <span className="text-sm text-gray-600">Fully Integrated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-amber-600" />
                    <span className="text-sm text-gray-600">API Available</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-emerald-100">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-emerald-100">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-emerald-100">Data Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-emerald-100">Active Features</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Feature?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team can develop custom features tailored to your pharmacy's specific needs.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200">
          Request Custom Feature
        </button>
      </div>
    </div>
  );
};

export default FeaturesPage;