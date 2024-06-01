use derive_builder::Builder;
use crate::utils::FloatFromZero;

pub type UnderlyingAssetPrice = FloatFromZero;

#[derive(Debug, Clone, Builder)]
pub struct UnderlyingAsset {
    pub price: UnderlyingAssetPrice,
    pub name: String,
}
