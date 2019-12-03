class Setad {
	date: Date
	constructor(...args: number[]) {
		// @ts-ignore
		this.date = new Date(...args)
	}

	getYear = (): number => {
		return this.date.getFullYear()
	}

	getMonth = (): number => {
		return this.date.getMonth()
	}

	getDay = (): number => {
		return this.date.getDate()
	}

	getHour = (): number => {
		return this.date.getHours()
	}

	getMinute = (): number => {
		return this.date.getMinutes()
	}

	getSecond = (): number => {
		return this.date.getSeconds()
	}

	getMillisecond = (): number => {
		return this.date.getMilliseconds()
	}

	readDay = (): string => {
		const days: string[] = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		]
		return days[this.date.getDay()]
	}

	readMonth = (): string => {
		const months: string[] = [
			'january',
			'february',
			'march',
			'april',
			'may',
			'june',
			'july',
			'august',
			'september',
			'october',
			'november',
			'december',
		]
		return months[this.date.getMonth()]
	}

	isLeapYear = (): boolean => {
		return this.date.getFullYear() % 4 == 0
	}

	mask = (mask: string): string => {
		const fullYear = this.getYear().toString()
		const truncYear = clipString(fullYear, 2, true)
		mask.replace('YEAR', fullYear)
		mask.replace('year', truncYear)

		const bareMonth = this.getMonth().toString()
		const paddedMonth = leftPad(bareMonth, 2)
		mask.replace('MONTH', paddedMonth)
		mask.replace('month', bareMonth)

		const fullMonthName = this.readMonth()
		const truncMonthName = clipString(fullMonthName, 3)
		mask.replace('MNAME', fullMonthName)
		mask.replace('mname', truncMonthName)

		const bareDay = this.getDay().toString()
		const paddedDay = leftPad(bareDay, 2)
		mask.replace('DAY', paddedDay)
		mask.replace('day', bareDay)

		const fullDayName = this.readDay()
		const truncDayName = clipString(fullDayName, 3)
		mask.replace('DNAME', fullDayName)
		mask.replace('dname', truncDayName)

		const bareHour = this.getHour().toString()
		const paddedHour = leftPad(bareHour, 2)
		mask.replace('HOUR', paddedHour)
		mask.replace('hour', bareHour)

		const bareMinute = this.getMinute().toString()
		const paddedMinute = leftPad(bareMinute, 2)
		mask.replace('MINUTE', paddedMinute)
		mask.replace('minute', bareMinute)

		const bareSecond = this.getSecond().toString()
		const paddedSecond = leftPad(bareSecond, 2)
		mask.replace('SECOND', paddedSecond)
		mask.replace('second', bareSecond)

		const bareMillisecond = this.getMillisecond().toString()
		const paddedMillisecond = leftPad(bareMillisecond, 4)
		mask.replace('MILLI', paddedMillisecond)
		mask.replace('milli', bareMillisecond)

		return mask
	}
}

// LeftPad expects an integer, and outputs a string.
const leftPad = (inputNum: string, digits: number): string => {
	// `output` is the string to give back; it starts empty.
	let output: string = ''
	// `size` is the number of digits that the number has.
	const size: number = inputNum.length
	if (size > digits) {
		const diff: number = size - digits
		output = '0'.repeat(diff)
	}
	return `${output}${inputNum}`
}

// ClipString is useful for masking phrases.
const clipString = (
	phrase: string,
	length: number,
	right: boolean = false
): string => {
	if (!right) {
		return phrase.slice(0, length)
	} else {
		return phrase.slice(-length)
	}
}
