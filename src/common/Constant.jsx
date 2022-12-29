export const BASE_URL = "http://localhost:9090";
// export const BASE_URL = "http://192.168.141.183:9090";

// export const COMPILER_API = "https://codex-api.herokuapp.com";
// export const COMPILER_API = "http://192.168.141.183:3333";
export const COMPILER_API = "http://localhost:3333";

export const  COMPILER_LANGUAGE = "c"

export const Sequential_C_code = `#include<stdio.h>
    int main(){
        int firstNumber=:value;
        int secondNumber=:value;
        int thirdNumber=:value;
        int sum = firstNumber+thirdNumber-secondNumber;
        printf("%d",sum);
    }
`;
export const Conditional_C_code = `#include<stdio.h>
    int main(){
        int firstNumber=:value;
        int secondNumber=:value;
        int thirdNumber=:value;
        if(firstNumber:comparethirdNumber){
            int sum = firstNumber+thirdNumber-secondNumber;
            printf("%d",sum);
        }else if(secondNumber:comparethirdNumber){
            printf("%d",thirdNumber);
        }else{
            printf("%d",secondNumber);
        }
        
    }
`;
export const Looping_C_code = `#include<stdio.h>
    int main(){
        for(int i=0;i<10;i++){
            printf("%d",i);
        }
    }
`;

export const Default_C_code = `#include<stdio.h>
    int main(){
        printf("Hikari Learning");
    }
`;
