'use server';

function commonFields(formData: FormData) {
    return {
        observer_fname: formData.get('first_name'),
        observer_lname: formData.get('last_name'),
        observed_date_time: formData.get('observed_date'),
        longitude: formData.get('longitude'),
        latitude: formData.get('latitude'),
        observation_note: formData.get('observation_note'),
        image: formData.get('image'),
    };
}

export async function shareBioDiversityData(formData: FormData) {
    const type = formData.get('type') as string

    const names = {
        common_name: formData.get('common_name'),
        scientific_name: formData.get('scientific_name'),
    }

    let response = {}
    if (type == 'birds') {
        response = {
            ...commonFields(formData),
            ...names,
            bird_count: formData.get('bird_count'),
            bird_behavior: formData.get('bird_behavior'),
        }
    }
    else if (type == 'plants') {
        response = {
            ...commonFields(formData),
            ...names,
            plant_type: formData.get('plant_type'),
            plant_stage: formData.get('plant_stage'),
            plant_condition: formData.get('plant_condition'),
            plant_height: formData.get('plant_height'),
            flower_color: formData.get('flower_color'),
            leaf_shape: formData.get('leaf_shape')
        }
    }
    else if (type == 'trees') {
        response = {
            ...commonFields(formData),
            ...names,
            tree_type: formData.get('tree_type'),
            tree_height: formData.get('tree_height'),
            trunk_diameter: formData.get('trunk_diameter'),
            tree_condition: formData.get('tree_condition')
        }
    }

    console.log(response)
}

export async function shareWaterQualityData(formData: FormData) {

    let response = {
        ...commonFields(formData),
        water_temperature: formData.get('water_temperature'),
        dissolved_oxygen_mgl: formData.get('dissolved_oxygen_mgl'),
        dissolved_oxygen_percent: formData.get('dissolved_oxygen_percent'),
        ph: formData.get('ph'),
        conductivity: formData.get('conductivity'),
        turbidity: formData.get('turbidity'),
        secchi_depth: formData.get('secchi_depth'),
        salinity: formData.get('salinity'),
        weather_condition: formData.get('weather_condition'),
        air_temperature: formData.get('air_temperature'),
    }
    console.log(response)
}