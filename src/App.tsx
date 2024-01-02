import { Row, Select,Checkbox, Col,Image } from "antd";
import "./index.css";
import { getCharacter } from "rickmortyapi";
import * as shlaami from "rickmortyapi"; // shlaami.getCharacter()
import * as plumbus from "rickmortyapi"; // shlaami.getCharacter()
import { useEffect, useState } from "react";

export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character extends ResourceBase {
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface ApiResponse<T> {
  /** The HTTP status code from the API response */
  status: number;
  /** The HTTP status message from the API response */
  statusMessage: string;
  /** The response that was provided by the API */
  data: T;

}

const App = () => {
  const [data, setData] = useState<ApiResponse<Character[]>| any>([]);
  const [selectedValues,setSelectedValues]=useState<any>([])
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);

    console.log( value)
    setSelectedValues(value)
  };

  const handleGetData = async () => {
    const response = await getCharacter([2, 3, 4, 5]);

    const tempArr = response.data.map((obj,index) => (
      {
        label: obj.name,
        value: obj.id,
        test:obj.image
      } 
    ));

    console.log(tempArr);

    setData(tempArr);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Row justify={"center"}>


      <Select
        mode="multiple"
        size="middle"
        onChange={handleChange}
        style={{ width: 200 }}
        options={data}
        
        optionRender={(obj)=><Row>
          <Col span={2}>
          <Checkbox style={{cursor:"pointer"}} disabled checked={selectedValues.includes(obj.value)}/>
          </Col>
          <Col span={2} offset={1}>
          </Col>
          <Col span={2} offset={1}>
          {obj.label}
          </Col>

          </Row>}
      />
    </Row>
  );
};

export default App;
