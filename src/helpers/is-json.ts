const isJSon = (value: any): string | null  => {
    try {
        JSON.stringify(value);
    } catch (_) {
      return null;
    }  
};

export default isJSon;