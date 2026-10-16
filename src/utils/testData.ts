export function uniqueEmployee() {
  const id = `${Date.now()}`;

  return {
    firstName: "Test",
    lastName: `Employee${id}`,
    employeeId: `EMP${id}`,
    email: `employee${id}@example.com`,
  };
}
