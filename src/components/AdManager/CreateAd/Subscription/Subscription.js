import React, { useState, useEffect } from "react";
import SubscriptionFormCard from "./SubscriptionFormCard";
import { Button } from "react-bootstrap";
import Switch from "react-switch";

// Redux
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actions/actionTypes";

const Subscription = (props) => {
  // Currently displayed to the user plan
  const [shownCard, setShownCard] = useState("Basic");

  // Currently selected plan
  const [selectedPlan, setSelectedPlan] = useState("");

  // Initial render
  useEffect(() => {
    // Scroll to the top of the form
    props.headingRef.current.scrollIntoView();

    if (props.state.subscriptionPlan != "") {
      if (props.state.subscriptionPlan == "onlyRunAds") {
        if (shownCard == "") {
          // Set Basic plan to be active when customer has chosen runOnlyAds
          setShownCard("Basic");
        }
      } else {
        setShownCard(props.state.subscriptionPlan);
      }
    }

    setSelectedPlan(props.state.subscriptionPlan);
  }, []);

  // Save to state and to redux state
  const selectPlan = (planName) => {
    setSelectedPlan(planName);
    props.saveSubscriptionPlan(planName);
  };

  const selectOnlyRunAds = (isChecked) => {
    if (isChecked) {
      // Update selected plan
      setSelectedPlan("onlyRunAds");

      // Update redux state
      props.saveSubscriptionPlan("onlyRunAds");
    } else {
      setSelectedPlan("");

      // Update redux state
      props.saveSubscriptionPlan("");
    }

    // Set Basic subscription as default
    // setShownCard("Basic");
  };

  // Active classes when it is the shown card
  let cardLinkBasicClass = `nav-link card-link ${
    shownCard == "Basic" ? "active" : null
  }`;
  let cardLinkPremiumClass = `nav-link card-link ${
    shownCard == "Premium" ? "active" : null
  }`;
  let cardLinkDeluxeClass = `nav-link card-link ${
    shownCard == "Deluxe" ? "active" : null
  }`;

  // Plan Listings
  const basicListing = [
    "Run your ads with your budget",
    "Ad design and message is up to you",
    "Run multiple ad campaigns",
    "Get 1 post in our social media account",
    "Choose when to run your ads",
    "Get notifications for your ad campaigns",
  ];

  return (
    <div className="subscription-form">
      <h3 className="border-bottom add-form-label">
        Choose your ad campaign plan
      </h3>

      {/* <div class="subscription-form-heading-plans col-md-10 offset-md-1 text-center">
                <p>Our subscriptions plans include a lot of helpful services and advices about 
                    running online adds. Obcaecati magnam eius perferendis vel</p>
            </div> */}

      <div className="subscription-form-cards ">
        <ul
          className="nav nav-tabs d-flex justify-content-between border-bottom-0"
          id="myTab"
          role="tablist"
        >
          <li className="nav-tab card-tab">
            <a
              className={cardLinkBasicClass}
              id={`headingBasic`}
              data-toggle="tab"
              href="#tabBasic"
              role="tab"
              aria-controls="tabBasic"
              aria-selected="true"
            >
              <div className="d-flex card-heading justify-content-center">
                <i className="fas mr-3 mb-2 fa-star"></i>
                <h1 className=" font-weight-bold">Basic</h1>
              </div>
            </a>
          </li>

          <li className="nav-tab card-tab">
            <a
              className={cardLinkPremiumClass}
              id={`headingPremium`}
              data-toggle="tab"
              href="#tabPremium"
              role="tab"
              aria-controls="tabPremium"
              aria-selected="true"
            >
              <div className="d-flex card-heading justify-content-center ">
                <i className="fas mr-3 mb-2 fa-crown"></i>
                <h1 className=" font-weight-bold">Premium</h1>
              </div>
            </a>
          </li>

          <li className="nav-tab card-tab">
            <a
              className={cardLinkDeluxeClass}
              id={`headingDeluxe`}
              data-toggle="tab"
              href="#tabDeluxe"
              role="tab"
              aria-controls="tabDeluxe"
              aria-selected="true"
            >
              <div className="d-flex card-heading justify-content-center ">
                <i className="fas mr-3 mb-2 fa-dice-d20"></i>
                <h1 className=" font-weight-bold">Deluxe</h1>
              </div>
            </a>
          </li>
        </ul>

        <div
          className="tab-content subscription-form-cards-body-container "
          id="myTabContent"
        >
          <SubscriptionFormCard
            planName="Basic"
            price="0"
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
            listing={basicListing}
            btnText="Select Basic"
            iconClass="fa-star"
            selectSubscriptionPlan={(planName) => selectPlan(planName)}
            selectedPlan={selectedPlan}
            shownCard={shownCard}
          />

          <SubscriptionFormCard
            planName="Premium"
            price="15"
            // desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit"
            listing={basicListing}
            btnText="Select Premium"
            iconClass="fa-crown"
            selectSubscriptionPlan={(planName) => selectPlan(planName)}
            selectedPlan={selectedPlan}
            shownCard={shownCard}
          />

          <SubscriptionFormCard
            planName="Deluxe"
            price="50"
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aliquid officia dicta ullam nesciunt recusandae nemo? Optio ducimus praesentium mollitia?
                        "
            listing={basicListing}
            btnText="Select Deluxe"
            iconClass="fa-dice-d20"
            selectSubscriptionPlan={(planName) => selectPlan(planName)}
            selectedPlan={selectedPlan}
            shownCard={shownCard}
          />
        </div>

        <div className="only-run-section ">
          <p className="or-divider w-100 border-bottom ">OR</p>
          <div className="row only-run-section-row text-center">
            <div className="content col-8 offset-2 toggle-container ">
              <h2 className="only-run-section-heading ">Only run ads</h2>
              <Switch
                onChange={(isChecked) => selectOnlyRunAds(isChecked)}
                checked={selectedPlan === "onlyRunAds" ? true : false}
                onColor="#4971ff"
                onHandleColor="#ffff"
                width={50}
                checkedIcon={false}
                uncheckedIcon={false}
              />
              
            </div>
            <div class="only-run-section-description col-md-8 offset-md-2 ">
              <p>
                {" "}
                With the only-run-ads option your ads will be run on the social
                media platforms of your choice with a small commission.
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            onClick={() => props.handleBack()}
            className="btn btn-back"
            type="submit"
          >
            Back
          </button>
          <Button
            variant="contained"
            className="btn btn-continue"
            onClick={() => props.goToCheckout()}
            disabled={selectedPlan == "" ? true : false}
          >
            Go to checkout
          </Button>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adInfo: state.adInfo,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSubscriptionPlan: (plan) =>
      dispatch({ type: actionTypes.SAVE_SUBSCRIPTION_PLAN, plan: plan }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
