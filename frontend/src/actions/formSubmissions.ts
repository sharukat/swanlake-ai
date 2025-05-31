'use server';

export async function shareBirdData(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 4000)); // 2000ms = 2 seconds
    const type = formData.get('type') as string

    const commonFields = {
        observer_fname: formData.get('first_name'),
        observer_lname: formData.get('last_name'),
        observed_date_time: formData.get('observed_date'),
        observed_day: formData.get('observed_day'),
        longitude: formData.get('longitude'),
        latitude: formData.get('latitude'),
        observation_note: formData.get('observation_note'),
        common_name: formData.get('common_name'),
        scientific_name: formData.get('scientific_name'),
        image: formData.get('image'),
    };

    let response = {}
    if (type == 'birds') {
        response = {
            ...commonFields,
            bird_count: formData.get('bird_count'),
        }
    }
    else if (type == 'plants') {
        response = {
            ...commonFields,
            plant_type: formData.get('plant_type'),
        }
    }

    console.log(response)
}