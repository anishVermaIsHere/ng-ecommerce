import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-cardskeleton',
  template: `
  <div role="status" class="flex flex-row justify-between mx-auto md:flex-col w-full max-w-md max-w-sm p-4  shadow animate-pulse md:p-6 dark:border-gray-700">
      <div class="flex items-center justify-center h-48 w-full mb-4 bg-gray-200  dark:bg-gray-700">
          
      </div>
      
      <div class="flex flex-col items-center p-2">
          <div>
              <div class="h-2.5 bg-gray-200  dark:bg-gray-700 w-32 mb-2"></div>
              <div class="h-2.5 bg-gray-200  dark:bg-gray-700 w-32 mb-2"></div>
              <div class="w-40 h-8 bg-gray-200  dark:bg-gray-700"></div>
          </div>
      </div>
      <span class="sr-only">Loading...</span>
  </div>
  `,
  styles: [
  ]
})

export class CardskeletonComponent {

}
