# Stream

## What is Stream?

Stream represents a sequence of objects from a source, which supports aggregate operations. Following are the characteristics of a Stream:

- Sequence of elements: A stream gets/computes elements on demand. It never stores the elements.
- Source: Stream takes Collections, Arrays, or I/O resources as input source.
- Aggregate operations: Stream supports aggregate operations like filter, map, limit, reduce, find, match.
- Pipelining: Most of the stream operations return stream itself so that their result can be pipelined.
- Automatic iterations: Stream operations do the iterations internally over the source elements provided, in contrast to Collections where explicit iteration is required.


## Generating Streams

Collection interface has two methods to generate a Stream:

- `stream()`
- `parallelStream()`


## Stream api

```java
// forEach
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);

// map
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
List<Integer> squaresList = numbers.stream().map(i -> i*i).distinct().collect(Collectors.toList());

// filter
List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
int count = strings.stream().filter(string -> string.isEmpty()).count();

// limit
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);

// sorted
Random random = new Random();
random.ints().limit(10).sorted().forEach(System.out::println);

// collect
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl");
String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));
System.out.println("Merged String: " + mergedString);

// reduce
Stream<Integer> stream = Stream.of(1, 2, 3);
int total = stream.reduce(0, (i, j) -> i + j);
System.out.println(total);

// Statistics
List numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics();
System.out.println("Highest number in List : " + stats.getMax());
System.out.println("Lowest number in List : " + stats.getMin());
System.out.println("Sum of all numbers : " + stats.getSum());
System.out.println("Average of all numbers : " + stats.getAverage());
```