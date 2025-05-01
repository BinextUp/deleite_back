import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('/')
  getInicio():string{
      return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NestJS Logo Responsivo</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background-color: #f5f5f5;
                font-family: 'Arial', sans-serif;
            }
            
            .logo-container {
                text-align: center;
                padding: 20px;
                max-width: 90%;
            }
            
            .nest-logo {
                width: 100%;
                max-width: 300px;
                height: auto;
                margin: 0 auto;
                transition: transform 0.3s ease;
            }
            
            .nest-logo:hover {
                transform: scale(1.05);
            }
            
            .logo-text {
                margin-top: 20px;
                font-size: clamp(1.5rem, 5vw, 2.5rem);
                font-weight: bold;
                color: #E0234E;
            }
            
            @media (max-width: 768px) {
                .nest-logo {
                    max-width: 200px;
                }
            }
            
            @media (max-width: 480px) {
                .nest-logo {
                    max-width: 150px;
                }
            }
        </style>
    </head>
    <body>
        <div class="logo-container">
            <div class="nest-logo">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0Z" fill="#E0234E"/>
                    <path d="M77.1429 60C77.1429 69.4286 69.4286 77.1429 60 77.1429C50.5714 77.1429 42.8571 69.4286 42.8571 60C42.8571 50.5714 50.5714 42.8571 60 42.8571C69.4286 42.8571 77.1429 50.5714 77.1429 60Z" fill="white"/>
                    <path d="M60 102.857C84.8571 102.857 105 82.7143 105 57.8571C105 33 84.8571 12.8571 60 12.8571C35.1429 12.8571 15 33 15 57.8571C15 82.7143 35.1429 102.857 60 102.857Z" stroke="white" stroke-width="6" stroke-miterlimit="10"/>
                </svg>
            </div>
            <div class="logo-text">NestJS</div>
        </div>
    </body>
    </html>
    `;
  }

}
