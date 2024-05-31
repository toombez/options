use chrono::{DateTime, Utc};
use refinement::Refinement;
use crate::asset::UnderlyingAsset;
use crate::utils::{FloatInRangeFromZeroToOneHundred, FloatMoreThanZero};

pub type RiskFreeInterestRate = Refinement<
    f32,
    FloatInRangeFromZeroToOneHundred,
>;

pub type Volatility = Refinement<
    f32,
    FloatInRangeFromZeroToOneHundred,
>;

pub type StrikePrice = Refinement<
    f32,
    FloatMoreThanZero,
>;

pub type ExpirationDate = DateTime<Utc>;

#[derive(Debug, Clone, Copy)]
pub enum FinanceOptionType {
    Call,
    Put,
}

#[derive(Debug, Clone)]
pub struct FinanceOption {
    pub option_type: FinanceOptionType,
    pub underlying_asset: UnderlyingAsset,
    pub strike_price: f32,
    pub risk_free_interest_rate: f32,
    pub volatility: f32,
    pub expiration_date: ExpirationDate,
}
