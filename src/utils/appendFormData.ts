export default function appendFormData(formData: FormData, values: any) {
  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // handle array of files
      if (value[0] instanceof File) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
        return;
      }
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
}
