import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';
import { toast } from 'react-toastify';

const SubsNavbar = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.admin || false;
  const [userEmail, setUserEmail] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [expandedForm, setExpandedForm] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/subscriptions/getSubscriptionPlans');
        setSubscriptions(response.data.subscriptionPlans); 
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleAddSubscription = async () => {
    if (userEmail.trim() ) {
      try {
        const response = await axios.post('http://localhost:8080/subscriptions/createUserSubscription', { email: userEmail, subscriptionId: subscriptionPlan });
        toast.success(`${userEmail} has been subscribed to plan ${subscriptionPlan}!`);
        setUserEmail('');
        setSubscriptionPlan('');
        setExpandedForm(null);
      } catch (error) {
        console.error('Error adding subscription:', error);
        toast.error('Error adding subscription. Please try again.');
      }
    }
  };

  const handleRemoveSubscription = async () => {
    if (userEmail.trim() && subscriptionPlan.trim()) {
      try {
        const response = await axios.put('http://localhost:8080/subscriptions/removeUserSubscriptions', { email: userEmail, planId: 0 });
        toast.success(`Subscription for ${userEmail} has been removed.`);
        setUserEmail('');
        setSubscriptionPlan('');
        setExpandedForm(null);
      } catch (error) {
        console.error('Error removing subscription:', error);
        toast.error('Error removing subscription. Please try again.');
      }
    }
  };

  return (
    isAdmin && (
      <div className="subs-navbar">
        {/* Add Subscription Button */}
        {!expandedForm && (
          <button className="add-subscription-btn" onClick={() => setExpandedForm('add')}>
            Add User Subscription
          </button>
        )}
        {expandedForm === 'add' && (
          <div className="subscription-form">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter user's email"
            />
            <select
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan((e.target.value))}
            >
              <option value="" disabled>Select subscription plan</option>
              {subscriptions.map(sub => (
                <option key={sub.id} value={sub.planId}>
                  {sub.name}
                </option>
              ))}
            </select>
            <button className="confirm-btn" onClick={handleAddSubscription}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={() => setExpandedForm(null)}>
              Cancel
            </button>
          </div>
        )}

        {/* Remove Subscription Button */}
        {!expandedForm && (
          <button className="remove-subscription-btn" onClick={() => setExpandedForm('remove')}>
            Remove User Subscription
          </button>
        )}
        {expandedForm === 'remove' && (
          <div className="subscription-form">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter user's email"
            />
            <select
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
            >
              <option value="" disabled>Select subscription plan</option>
              {subscriptions.map(sub => (
                <option key={sub.id} value={sub.planId}>
                  {sub.name}
                </option>
              ))}
            </select>
            <button className="confirm-btn" onClick={handleRemoveSubscription}>
              Confirm
            </button>
            <button className="cancel-btn" onClick={() => setExpandedForm(null)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default SubsNavbar;
