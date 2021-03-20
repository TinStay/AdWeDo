import React from 'react';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionPlans = props =>{
    const basicListing = ["Run your ads with your budget", "Run up to 5 ad campaigns at a time", "Ad design and message is up to you", "Get 1 post in our social media account", "Choose your schedule", "Get notifications for your ad campaigns"];

    return(
        <div className="subscription-section ">
            <div className="subscription-jumbotron text-center">
                <h1>Choose your plan</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="subscription-row row">
                <div className="col-md-6 col-xl-4 ">
                    <SubscriptionCard 
                    title="Basic" 
                    price="0"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Go to ad manager"
                    iconClass="fa-star"
                    />
                </div>
                <div className="col-md-6 col-xl-4 subscription-row-standout">
                    <SubscriptionCard 
                    title="Premium" 
                    price="15"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Premium"
                    iconClass="fa-crown"
                    />
                </div>
                <div className="col-md-6 col-xl-4 second-card">
                    <SubscriptionCard 
                    title="Deluxe" 
                    price="50"
                    // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
                    listing={basicListing}
                    btnText="Update to Deluxe"
                    iconClass="fa-dice-d20"
                    />
                </div>
                
                
                
            </div>
        </div>
    )
}

export default SubscriptionPlans;