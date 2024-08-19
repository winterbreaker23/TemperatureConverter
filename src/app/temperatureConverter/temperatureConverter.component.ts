import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'temperature-converter',
  templateUrl: './temperatureConverter.component.html',
  styleUrls: ['./temperatureConverter.component.scss']
})
export class TemperatureConverter implements OnInit {
  celsius: number | null = null;
  fahrenheit: number | null = null;

  ngOnInit() {}

  onCelsiusChange(value: string) {
    const celsiusValue = parseFloat(value);
    if (!isNaN(celsiusValue)) {
      this.fahrenheit = parseFloat((celsiusValue * 9 / 5 + 32).toFixed(1));
    } else {
      this.fahrenheit = null;
    }
  }

  onFahrenheitChange(value: string) {
    const fahrenheitValue = parseFloat(value);
    if (!isNaN(fahrenheitValue)) {
      this.celsius = parseFloat(((fahrenheitValue - 32) * 5 / 9).toFixed(1));
    } else {
      this.celsius = null;
    }
  }
}
