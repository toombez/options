use std::fmt::Error;

pub trait ParsedValue<T, K = T> {
    fn parse(value: T) -> Result<K, Error>;
}

pub trait ValidatedValue<T> {
    fn is_valid(value: T) -> bool;
    fn validate(value: T) -> Result<T, Error>;
}

pub trait GetValue<T> {
    fn value(&self) -> T;
}
