import FormInput from "./fields/FormInput";
import MultiSelect from "./fields/MultiSelect";
import { CommonFields, ImageFields } from "./fields/SharedFields";

const TechnicalServicesForm = ({ control }: { control: any }) => {
  const checklistValues = [
    "Dusk on surfaces",
    "stained carpets",
    "missing toiletries",
    "toilet not sanitized",
    "mold in shower",
    "damaged furniture",
  ];
  return (
    <>
      <CommonFields control={control} />
      <MultiSelect
        fieldName="checklist"
        values={checklistValues}
        control={control}
      />
      <ImageFields control={control} />
    </>
  );
};

export default TechnicalServicesForm;
