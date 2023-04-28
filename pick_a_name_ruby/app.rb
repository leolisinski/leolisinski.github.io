names_left = File.readlines("not_picked_names.txt")
i = 0
while i < names_left.length
    names_left[i].chomp!
    i += 1
end

number_of_names_left = names_left.length

if number_of_names_left > 0

    random_index = rand(0...number_of_names_left)

    random_name = names_left[random_index]

    picked_names_file = File.open("picked_names.txt", "a")

    picked_names_file.puts(names_left.delete_at(random_index))

    puts "Nästa namn: #{random_name}. Därefter #{number_of_names_left - 1} namn kvar på listan."

    picked_names_file.close

    not_picked_names_file = File.open("not_picked_names.txt", "w")

    not_picked_names_file.puts(names_left)

    not_picked_names_file.close

else

    puts "Inga namn kvar på listan"

end

gets
