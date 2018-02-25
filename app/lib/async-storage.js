import ReactNative from 'react-native';
var {
    AsyncStorage
} = ReactNative;

export default class Storage {
    static get (key:string):Promise {
        return AsyncStorage.getItem(key);
    }
    
    static save (key:string, value:mixed):void {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
    
    static async update (key:string, value:any) {
        let existingKey:string = await this.get(key);
        const updatedValue = typeof value === 'string' 
            ? value : Object.assign({}, JSON.parse(existingKey), value);
        return AsyncStorage.setItem(key, JSON.stringify(updatedValue));
    }
    
    static remove (key:string) {
        return AsyncStorage.removeItem(key);
    }
}

