use std::fmt::Error;
use num::Float;
use num::traits::bounds::{LowerBounded, UpperBounded};

use super::traits::{GetValue, ParsedValue, ValidatedValue};

#[derive(Debug, Clone, Copy)]
pub struct FloatFromZero<T = f64>(T) where T: Float;

impl<T> LowerBounded for FloatFromZero<T> where T: Float {
    fn min_value() -> Self {
        Self(T::zero())
    }
}

impl <T> GetValue<T> for FloatFromZero<T> where T: Float {
    fn value(&self) -> T {
        self.0
    }
}

impl <T> ValidatedValue<T> for FloatFromZero<T> where T: Float {
    fn is_valid(value: T) -> bool {
        Self::validate(value).is_ok()
    }

    fn validate(value: T) -> Result<T, Error> {
        if value >= Self::min_value().value() {
            Ok(value)
        } else {
            Err(Error)
        }
    }
}

impl <T> ParsedValue<T, Self> for FloatFromZero<T> where T: Float {
    fn parse(value: T) -> Result<Self, Error> {
        if Self::is_valid(value) { Ok(Self(value)) } else { Err(Error) }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct FloatFromZeroToOneHundred<T = f64>(T) where T: Float;

impl<T> LowerBounded for FloatFromZeroToOneHundred<T> where T: Float {
    fn min_value() -> Self {
        Self(T::zero())
    }
}

impl<T> UpperBounded for FloatFromZeroToOneHundred<T> where T: Float {
    fn max_value() -> Self {
        Self(T::from(100.0).unwrap())
    }
}

impl <T> GetValue<T> for FloatFromZeroToOneHundred<T> where T: Float {
    fn value(&self) -> T {
        self.0
    }
}

impl <T> ValidatedValue<T> for FloatFromZeroToOneHundred<T> where T: Float {
    fn is_valid(value: T) -> bool {
        Self::validate(value).is_ok()
    }

    fn validate(value: T) -> Result<T, Error> {
        let min_value = Self::min_value().value();
        let max_value = Self::max_value().value();

        if value >= min_value && value <= max_value {
            Ok(value)
        } else {
            Err(Error)
        }
    }
}

impl <T> ParsedValue<T, Self> for FloatFromZeroToOneHundred<T> where T: Float {
    fn parse(value: T) -> Result<Self, Error> {
        if Self::is_valid(value) { Ok(Self(value)) } else { Err(Error) }
    }
}
