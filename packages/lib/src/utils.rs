use std::fmt::Error;
use num::traits::bounds::{LowerBounded, UpperBounded};

pub trait HiddenValue<T>: Sized {
    fn value(&self) -> T;
    fn is_valid(value: T) -> bool;
    fn parse(value: T) -> Result<Self, Error>;
}

#[derive(Debug, Clone, Copy)]
pub struct FloatInRangeFromZeroToOneHundred(f64);

impl LowerBounded for FloatInRangeFromZeroToOneHundred {
    fn min_value() -> Self {
        Self(0.0)
    }
}

impl UpperBounded for FloatInRangeFromZeroToOneHundred {
    fn max_value() -> Self {
        Self(100.0)
    }
}

impl HiddenValue<f64> for FloatInRangeFromZeroToOneHundred {
    fn value(&self) -> f64 {
        self.0
    }

    fn is_valid(value: f64) -> bool {
        let min_value = Self::min_value().value();
        let max_value = Self::max_value().value();

        value >= min_value && value <= max_value
    }

    fn parse(value: f64) -> Result<FloatInRangeFromZeroToOneHundred, Error> {
        if Self::is_valid(value) {
            Ok(Self(value))
        } else {
            Err(Error)
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct FloatFromZero(f64);

impl LowerBounded for FloatFromZero {
    fn min_value() -> Self {
        Self(0.0)
    }
}

impl HiddenValue<f64> for FloatFromZero {
    fn value(&self) -> f64 {
        self.0
    }

    fn is_valid(value: f64) -> bool {
        value >= 0.0
    }

    fn parse(value: f64) -> Result<Self, Error> where Self: Sized {
        if Self::is_valid(value) {
            Ok(Self(value))
        } else {
            Err(Error)
        }
    }
}
