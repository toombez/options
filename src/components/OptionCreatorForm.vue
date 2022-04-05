<template>
<form>
    <OptionParameterComponent
        v-for="(parameter, index) in optionParameters.values()"
        :key="index"
        :parameter="(parameter as OptionParameter<number | string>)"
        @change="sendOption"
    />
</form>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import Option from '@/structures/Option';
import OptionParameter, { DateOptionParameter, NumberOptionParameter } from '@/structures/OptionParameter';
import OptionParameterComponent from '@/components/OptionParameter.vue';

const emit = defineEmits(['update:modelValue']);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
    modelValue: Option
});

function sendOption() {
    const rawOption = Object.create(null);

    optionParameters.value.forEach(parameter => {
        rawOption[parameter.name] = parameter.formatValue();
    });

    emit('update:modelValue', new Option(rawOption));
}

onMounted(() => {
    sendOption();
});

const optionParameters = ref<OptionParameter<number | string>[]>([
    new NumberOptionParameter({
        name: 's0',
        value: 140,
        description: 'Значение рискового актива в начальный момент времени',
        min: 0,
        displayedName: 's0',
    }),
    new NumberOptionParameter({
        name: 'K',
        value: 135,
        description: 'Контрактная цена',
        min: 0,
        displayedName: 'K',
    }),
    new NumberOptionParameter({
        name: 'r',
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Безрисковая процентная ставка за период ∆t',
        displayedName: 'r',
    }),
    new NumberOptionParameter({
        name: 'sigma',
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.1,
        description: 'Волатильность',
        displayedName: '\u03C3',
    }),
    new DateOptionParameter({
        name: 'T',
        value: new Date(Date.now() + 3600 * 1000 * 24 * 90).toISOString().slice(0, 10),
        min: new Date().toISOString().slice(0, 10),
        description: 'Дата погашения',
        displayedName: 'T',
    }),
]);
</script>