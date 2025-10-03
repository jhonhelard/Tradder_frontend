export interface PaymentRequestModel {
    priceId: string;
    stripeToken: string;
}

export interface IResult<T> {
    message: string;
    code: string;
    reason: string;
    data: T;
}

export interface PaymentResponse {
    planType: string;
    periodType: string;
    stripeToken: string;
}

export interface SubscriptionCreateResponse {
    subscriptionId: string;
    clientSecret: string;
}

export interface SelectedSubscriptionPlan {
    priceId: string;
    amount: number;
}

export interface StripSubscriptionResponseModel {
    SubscriptionId: string;
    current_period_start: Date;
    current_period_end: Date;
    price_id: string;
    tiers_mode: string;
    ActiveSubscription: boolean;
}