<script setup lang="ts">
import { UnderlyingAssetBuilder, OptionBuilder, BSM } from '@options/lib'

const option = new OptionBuilder()
    .setUnderlyingAsset(new UnderlyingAssetBuilder()
        .setName('lorem 1')
        .setPrice(300)
        .setVolatility(0.15)
        .setDividendYield(0.03)
        .build()
    )
    .setPremium(22)
    .setExpirationDate(new Date('10.07.2024'))
    .setDate(new Date('10.07.2023'))
    .setRiskFreeRate(0.03)
    .setType('PUT')
    .setStrikePrice(250)
    .build()

const bsm = new BSM(option, 365)
</script>

<template>
    <div>
        BS model call: {{ bsm.callPrice }}
        <br>
        BS model put: {{ bsm.putPrice }}
    </div>
</template>
