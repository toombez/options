use refinement::Refinement;
use crate::utils::FloatMoreThanZero;

pub type UnderlyingAssetPrice = Refinement<
    f32,
    FloatMoreThanZero,
>;

#[derive(Debug, Clone)]
pub struct UnderlyingAsset {
    pub price: UnderlyingAssetPrice,
    pub name: String,
}
