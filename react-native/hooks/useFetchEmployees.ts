import { useEffect, useState } from "react";

export interface Employee {
  name: string;
  gender: "male" | "female";
  image: string;
  originalUrl: string;
}

interface EmployeeResponse {
  loading: boolean;
  error?: string;
  employees?: Employee[];
}

const apiToken = "todo_replace_with_valid_token";

export const useFetchEmployees = (): EmployeeResponse => {
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    const url = `https://employee-image-provider.azurewebsites.net/api/fetchallemployeeimageurls?code=${apiToken}`;
    fetch(url)
      .then((response) => {
        response.json().then((json) => {
          const employees: Employee[] = json.map((employee: any) => {
            return {
              name: employee.Name,
              gender: employee.Gender,
              originalUrl: employee.Image,
              image: cleanUrl(employee.Image),
            } as Employee;
          });

          setEmployees(employees);
        });
      })
      .catch((error) => {
        setError("Kunne ikke laste inn data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    employees,
  };
};

const cleanUrl = (url: string) => {
  const whiteSpaceRegex = /\s/g;
  const oeRegex = /ø/g;
  const oeRegexCap = /Ø/g;
  const aeRegex = /æ/g;
  const aeRegexCap = /Æ/g;
  const aaRegex = /å/g;
  const aaRegexCap = /Å/g;
  const eacuteRegexCap = /é/g;
  const egraveRegexCap = /è/g;
  const aumlautRegexCap = /ä/g;

  return url
    .replace(whiteSpaceRegex, "%20")
    .replace(oeRegex, "%C3%B8")
    .replace(oeRegexCap, "%C3%98")
    .replace(aeRegex, "%C3%A6")
    .replace(aeRegexCap, "%C3%86")
    .replace(aaRegex, "%C3%A5")
    .replace(aaRegexCap, "%C3%85")
    .replace(eacuteRegexCap, "%C3%A9")
    .replace(egraveRegexCap, "%C3%A8")
    .replace(aumlautRegexCap, "%C3%A4");
};
