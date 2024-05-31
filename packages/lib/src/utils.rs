pub struct FloatInRangeFromZeroToOneHundred;
use refinement::Predicate;

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
