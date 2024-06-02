use chrono::{DateTime, TimeZone, Utc};
use derive_builder::Builder;

use crate::asset::underlying_asset::UnderlyingAsset;
use crate::utils::numbers::{FloatFromZero, FloatFromZeroToOneHundred};

use super::finance_option_type::FinanceOptionType;

pub type StrikePrice = FloatFromZero;
pub type RiskFreeInterestRate = FloatFromZeroToOneHundred;
pub type ExpirationDate<T> = DateTime<T>;

#[derive(Debug, Clone, Builder)]
pub struct FinanceOption<T = Utc>
where T: TimeZone {
    pub option_type: FinanceOptionType,
    pub underlying_asset: UnderlyingAsset,
    pub strike_price: StrikePrice,
    pub risk_free_interest_rate: RiskFreeInterestRate,
    pub expiration_date: ExpirationDate<T>,
}
