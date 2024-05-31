use chrono::{DateTime, Utc};
use refinement::{Predicate, Refinement};
use crate::asset::UnderlyingAsset;

pub struct FloatInRangeFromZeroToOneHundred;

impl Predicate<f32> for FloatInRangeFromZeroToOneHundred {
    fn test(x: &f32) -> bool {
        (0.0..100.0).contains(x)
    }
}

pub struct FloatMoreThanZero;

impl Predicate<f32> for FloatMoreThanZero {
    fn test(x: &f32) -> bool {
        *x > 0.0
    }
}

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

pub struct FinanceOption {
    pub option_type: FinanceOptionType,
}

impl FinanceOption {
    pub fn create_put() -> Self {
        Self { option_type: FinanceOptionType::Put }
    }

    pub fn create_call() -> Self {
        Self { option_type: FinanceOptionType::Call }
    }
}
