
export default class API {
  baseUrl = 'http://135.181.35.61:2112/';
  token = '';

  getConfig(method:string) {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    }
  }

  getConfigBody(method:string, body:object) {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
      body: JSON.stringify(body),
    }
  }

  async getUser() {
    try {
      const response = await fetch(this.baseUrl + 'auth?user=USERNAME');
      this.token = response.headers.get('Authorization');
      return this.token;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getOrganization() {
    try {
      const response = await fetch(this.baseUrl + 'companies/12', this.getConfig('GET'));
      const data = await response.json();
      //console.log(data);
      return data;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async patchOrganization(obj:Object) {
    try {
      const response = await fetch(this.baseUrl + 'companies/12', this.getConfigBody('PATCH', obj));
      const data = await response.json();
      //console.log(data);
      return data;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async deleteOrganization() {
    try {
      const response = await fetch(this.baseUrl + 'companies/12', this.getConfig('DELETE'));
      const data = await response.json();
      //console.log(data);
      return data;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async getContact(id:number) {
    try {
      const response = await fetch(this.baseUrl + 'contacts/' + id, this.getConfig('GET'));
      const data = await response.json();
      //console.log(data);
      return data;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async patchContact(id:number, obj:Object) {
    try {
      const response = await fetch(this.baseUrl + 'contacts/' + id, this.getConfigBody('PATCH', obj));
      const data = await response.json();
      //console.log(data);
      return data;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async deletePhoto(name:string) {
    try {
      const response = await fetch(this.baseUrl + 'companies/12/image/' + name, this.getConfig('DELETE'));
      console.log(response);
      if(response.ok) return true;
    }catch(err) {
      console.log(err);
      throw new Error(err);
    }
  }
}
