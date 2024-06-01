use chrono::{DateTime, TimeZone, Utc};
use derive_builder::Builder;

use crate::asset::UnderlyingAsset;
use crate::utils::{FloatFromZero, FloatFromZeroToOneHundred};

pub type Volatility = FloatFromZeroToOneHundred;
pub type StrikePrice = FloatFromZero;
pub type RiskFreeInterestRate = FloatFromZeroToOneHundred;
pub type ExpirationDate<T> = DateTime<T>;

#[derive(Debug, Clone, Copy)]
pub enum FinanceOptionType {
    Call,
    Put,
}

#[derive(Debug, Clone, Builder)]
pub struct FinanceOption<T = Utc>
where T: TimeZone {
    pub option_type: FinanceOptionType,
    pub underlying_asset: UnderlyingAsset,
    pub strike_price: StrikePrice,
    pub risk_free_interest_rate: RiskFreeInterestRate,
    pub volatility: Volatility,
    pub expiration_date: ExpirationDate<T>,
}
