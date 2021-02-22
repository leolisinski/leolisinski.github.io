def draw_board()
    assign()
    system("cls")
    puts"
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ■       ■       ■       ■       ■
    ■#{@a_11}#{@a_12}#{@a_13}#{@a_14}#{@a_15}#{@a_16}#{@a_17}■#{@a_21}#{@a_22}#{@a_23}#{@a_24}#{@a_25}#{@a_26}#{@a_27}■#{@a_31}#{@a_32}#{@a_33}#{@a_34}#{@a_35}#{@a_36}#{@a_37}■#{@a_41}#{@a_42}#{@a_43}#{@a_44}#{@a_45}#{@a_46}#{@a_47}■
    ■       ■       ■       ■       ■
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ■       ■       ■       ■       ■
    ■#{@b_11}#{@b_12}#{@b_13}#{@b_14}#{@b_15}#{@b_16}#{@b_17}■#{@b_21}#{@b_22}#{@b_23}#{@b_24}#{@b_25}#{@b_26}#{@b_27}■#{@b_31}#{@b_32}#{@b_33}#{@b_34}#{@b_35}#{@b_36}#{@b_37}■#{@b_41}#{@b_42}#{@b_43}#{@b_44}#{@b_45}#{@b_46}#{@b_47}■
    ■       ■       ■       ■       ■
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ■       ■       ■       ■       ■
    ■#{@c_11}#{@c_12}#{@c_13}#{@c_14}#{@c_15}#{@c_16}#{@c_17}■#{@c_21}#{@c_22}#{@c_23}#{@c_24}#{@c_25}#{@c_26}#{@c_27}■#{@c_31}#{@c_32}#{@c_33}#{@c_34}#{@c_35}#{@c_36}#{@c_37}■#{@c_41}#{@c_42}#{@c_43}#{@c_44}#{@c_45}#{@c_46}#{@c_47}■
    ■       ■       ■       ■       ■
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ■       ■       ■       ■       ■
    ■#{@d_11}#{@d_12}#{@d_13}#{@d_14}#{@d_15}#{@d_16}#{@d_17}■#{@d_21}#{@d_22}#{@d_23}#{@d_24}#{@d_25}#{@d_26}#{@d_27}■#{@d_31}#{@d_32}#{@d_33}#{@d_34}#{@d_35}#{@d_36}#{@d_37}■#{@d_41}#{@d_42}#{@d_43}#{@d_44}#{@d_45}#{@d_46}#{@d_47}■
    ■       ■       ■       ■       ■
    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    "
    puts "        GOAL: REACH THE 2048 TILE    "
    puts "             MAKE YOUR MOVE!         "
    puts "                  -----              "
    puts "                  | W |              "
    puts "              -------------          "
    puts "              | A | S | D |          "
    puts "              -------------          "
    puts "                 +ENTER              "
    puts "                                     "
    puts "                  SCORE:             "
    points_row(@current_points)
end

def points_row(points)
    case points.to_s.length
    when 1
        puts "                    #{points}                "
    when 2
        puts "                   #{points}                "
    when 3
        puts "                   #{points}               "
    when 4
        puts "                  #{points}               "
    when 5
        puts "                  #{points}              "
    when 6
        puts "                 #{points}              "
    when 7
        puts "                 #{points}             "
    when 8
        puts "                #{points}             "
    when 9
        puts "                #{points}            "
    end
end

@current_points = 0

def assign()
    @a_11 = @value_vector[0][0][0]
    @a_12 = @value_vector[0][0][1]    
    @a_13 = @value_vector[0][0][2]
    @a_14 = @value_vector[0][0][3]
    @a_15 = @value_vector[0][0][4]
    @a_16 = @value_vector[0][0][5]
    @a_17 = @value_vector[0][0][6]

    @a_21 = @value_vector[0][1][0]
    @a_22 = @value_vector[0][1][1]    
    @a_23 = @value_vector[0][1][2]
    @a_24 = @value_vector[0][1][3]
    @a_25 = @value_vector[0][1][4]
    @a_26 = @value_vector[0][1][5]
    @a_27 = @value_vector[0][1][6]

    @a_31 = @value_vector[0][2][0]
    @a_32 = @value_vector[0][2][1]    
    @a_33 = @value_vector[0][2][2]
    @a_34 = @value_vector[0][2][3]
    @a_35 = @value_vector[0][2][4]
    @a_36 = @value_vector[0][2][5]
    @a_37 = @value_vector[0][2][6]

    @a_41 = @value_vector[0][3][0]
    @a_42 = @value_vector[0][3][1]    
    @a_43 = @value_vector[0][3][2]
    @a_44 = @value_vector[0][3][3]
    @a_45 = @value_vector[0][3][4]
    @a_46 = @value_vector[0][3][5]
    @a_47 = @value_vector[0][3][6]

    @b_11 = @value_vector[1][0][0]
    @b_12 = @value_vector[1][0][1]    
    @b_13 = @value_vector[1][0][2]
    @b_14 = @value_vector[1][0][3]
    @b_15 = @value_vector[1][0][4]
    @b_16 = @value_vector[1][0][5]
    @b_17 = @value_vector[1][0][6]

    @b_21 = @value_vector[1][1][0]
    @b_22 = @value_vector[1][1][1]    
    @b_23 = @value_vector[1][1][2]
    @b_24 = @value_vector[1][1][3]
    @b_25 = @value_vector[1][1][4]
    @b_26 = @value_vector[1][1][5]
    @b_27 = @value_vector[1][1][6]

    @b_31 = @value_vector[1][2][0]
    @b_32 = @value_vector[1][2][1]    
    @b_33 = @value_vector[1][2][2]
    @b_34 = @value_vector[1][2][3]
    @b_35 = @value_vector[1][2][4]
    @b_36 = @value_vector[1][2][5]
    @b_37 = @value_vector[1][2][6]

    @b_41 = @value_vector[1][3][0]
    @b_42 = @value_vector[1][3][1]    
    @b_43 = @value_vector[1][3][2]
    @b_44 = @value_vector[1][3][3]
    @b_45 = @value_vector[1][3][4]
    @b_46 = @value_vector[1][3][5]
    @b_47 = @value_vector[1][3][6]

    @c_11 = @value_vector[2][0][0]
    @c_12 = @value_vector[2][0][1]    
    @c_13 = @value_vector[2][0][2]
    @c_14 = @value_vector[2][0][3]
    @c_15 = @value_vector[2][0][4]
    @c_16 = @value_vector[2][0][5]
    @c_17 = @value_vector[2][0][6]

    @c_21 = @value_vector[2][1][0]
    @c_22 = @value_vector[2][1][1]    
    @c_23 = @value_vector[2][1][2]
    @c_24 = @value_vector[2][1][3]
    @c_25 = @value_vector[2][1][4]
    @c_26 = @value_vector[2][1][5]
    @c_27 = @value_vector[2][1][6]

    @c_31 = @value_vector[2][2][0]
    @c_32 = @value_vector[2][2][1]    
    @c_33 = @value_vector[2][2][2]
    @c_34 = @value_vector[2][2][3]
    @c_35 = @value_vector[2][2][4]
    @c_36 = @value_vector[2][2][5]
    @c_37 = @value_vector[2][2][6]

    @c_41 = @value_vector[2][3][0]
    @c_42 = @value_vector[2][3][1]    
    @c_43 = @value_vector[2][3][2]
    @c_44 = @value_vector[2][3][3]
    @c_45 = @value_vector[2][3][4]
    @c_46 = @value_vector[2][3][5]
    @c_47 = @value_vector[2][3][6]

    @d_11 = @value_vector[3][0][0]
    @d_12 = @value_vector[3][0][1]    
    @d_13 = @value_vector[3][0][2]
    @d_14 = @value_vector[3][0][3]
    @d_15 = @value_vector[3][0][4]
    @d_16 = @value_vector[3][0][5]
    @d_17 = @value_vector[3][0][6]

    @d_21 = @value_vector[3][1][0]
    @d_22 = @value_vector[3][1][1]    
    @d_23 = @value_vector[3][1][2]
    @d_24 = @value_vector[3][1][3]
    @d_25 = @value_vector[3][1][4]
    @d_26 = @value_vector[3][1][5]
    @d_27 = @value_vector[3][1][6]

    @d_31 = @value_vector[3][2][0]
    @d_32 = @value_vector[3][2][1]    
    @d_33 = @value_vector[3][2][2]
    @d_34 = @value_vector[3][2][3]
    @d_35 = @value_vector[3][2][4]
    @d_36 = @value_vector[3][2][5]
    @d_37 = @value_vector[3][2][6]

    @d_41 = @value_vector[3][3][0]
    @d_42 = @value_vector[3][3][1]    
    @d_43 = @value_vector[3][3][2]
    @d_44 = @value_vector[3][3][3]
    @d_45 = @value_vector[3][3][4]
    @d_46 = @value_vector[3][3][5]
    @d_47 = @value_vector[3][3][6]

end

@value_vector =
    [
    [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]],
    [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]],
    [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]],
    [[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "],[" "," "," "," "," "," "," "]],
    ]

@joined_markers =
    [
    [[false], [false], [false], [false],],
    [[false], [false], [false], [false],],
    [[false], [false], [false], [false],],
    [[false], [false], [false], [false],],    
    ]

def clear_joined_markers()
    i = 0
    while i < 4
        j = 0
        while j < 4
            @joined_markers[i][j] = false
            j += 1
        end
        i += 1
    end
end

def brick_value(row_index, column_index)
    temp_array = [nil, nil, nil, nil, nil, nil, nil]
    i = 0
    while i < 7
        if @value_vector[row_index][column_index][i] != " "
            temp_array[i] = @value_vector[row_index][column_index][i]
        end
        i += 1
    end
    i = 0
    value_string = ""
    while i < 7
        if temp_array[i] != nil
            value_string += temp_array[i].to_s
        end
        i += 1
    end
    if temp_array == [nil, nil, nil, nil, nil, nil, nil]
        return 0
    end
    value_integer = value_string.to_i
    return value_integer
end

def clear_brick(i, j)
    @value_vector[i][j][0] = " "
    @value_vector[i][j][1] = " "
    @value_vector[i][j][2] = " "
    @value_vector[i][j][3] = " "
    @value_vector[i][j][4] = " "
    @value_vector[i][j][5] = " "
    @value_vector[i][j][6] = " "
end


def move_brick_one_step(i, j, direction)
    @brick_moved = false
    case direction
    when "left"
        if j != 0 && (brick_value(i, j-1) == 0 || brick_value(i, j) == brick_value(i, j-1))
            if brick_value(i, j) == brick_value(i, j-1)
                if @joined_markers[i][j-1] == false 
                    place_value(i, j-1, brick_value(i, j)*2)
                    @current_points += brick_value(i, j)*2
                    clear_brick(i, j)
                    @brick_moved = true
                    @joined_markers[i][j-1] = true
                end
            else
                place_value(i, j-1, brick_value(i, j))
                clear_brick(i, j)
                @brick_moved = true
            end
        else
            return nil
        end
    when "right"
        if j != 3 && (brick_value(i, j+1) == 0 || brick_value(i, j) == brick_value(i, j+1))
            if brick_value(i, j) == brick_value(i, j+1)
                if @joined_markers[i][j+1] == false 
                    place_value(i, j+1, brick_value(i, j)*2)
                    @current_points += brick_value(i, j)*2
                    clear_brick(i, j)
                    @brick_moved = true
                    @joined_markers[i][j+1] = true 
                end
            else
                place_value(i, j+1, brick_value(i, j))
                clear_brick(i, j)
                @brick_moved = true
            end
        else
            return nil
        end
    when "down"
        if i != 3 && (brick_value(i+1, j) == 0 || brick_value(i, j) == brick_value(i+1, j))
            if brick_value(i, j) == brick_value(i+1, j)
                if @joined_markers[i+1][j] == false 
                    place_value(i+1, j, brick_value(i, j)*2)
                    @current_points += brick_value(i, j)*2
                    clear_brick(i, j)
                    @brick_moved = true
                    @joined_markers[i+1][j] = true 
                end
            else
                place_value(i+1, j, brick_value(i, j))
                clear_brick(i, j)
                @brick_moved = true
            end
        else
            return nil
        end
    when "up"
        if i != 0 && (brick_value(i-1, j) == 0 || brick_value(i, j) == brick_value(i-1, j))
            if brick_value(i, j) == brick_value(i-1, j)
                if @joined_markers[i-1][j] == false 
                    place_value(i-1, j, brick_value(i, j)*2)
                    @current_points += brick_value(i, j)*2
                    clear_brick(i, j)
                    @brick_moved = true
                    @joined_markers[i-1][j] == true 
                end
            else
                place_value(i-1, j, brick_value(i, j))
                clear_brick(i, j)
                @brick_moved = true
            end
        else
            return nil
        end
    end
    if @brick_moved
        @still_moving = true
    end
end

def can_still_move(direction)
    case direction
    when "left"
        i = 0
        while i < 4
            j = 1
            while j < 4
                if brick_value(i, j) == brick_value(i, j-1) || brick_value(i, j) == 0 || brick_value(i, j-1) == 0
                    return true
                end
                j += 1
            end
            i += 1
        end
    when "right"
        i = 0
        while i < 4
            j = 2
            while j >= 0
                if brick_value(i, j) == brick_value(i, j+1) || brick_value(i, j) == 0 || brick_value(i, j+1) == 0
                    return true
                end
                j -= 1
            end
            i += 1
        end
    when "up"
        j = 0
        while j < 4
            i = 1
            while i < 4
                if brick_value(i, j) == brick_value(i-1, j) || brick_value(i, j) == 0 || brick_value(i-1, j) == 0
                    return true
                end
                i += 1
            end
            j += 1
        end
    when "down"
        j = 0
        while j < 4
            i = 2
            while i >= 0
                if brick_value(i, j) == brick_value(i+1, j) || brick_value(i, j) == 0 || brick_value(i+1, j) == 0
                    return true
                end
                i -= 1
            end
            j += 1
        end
    end
end
        
def move_all_one_step(direction)
    @still_moving = false
    case direction
    when "left"
        i = 0
        while i < 4
            j = 0
            while j < 4
                if brick_value(i, j) != 0
                    move_brick_one_step(i, j, direction)
                end
                j += 1
            end
            i += 1
        end
    when "right"
        i = 0
        while i < 4
            j = 3
            while j >= 0
                if brick_value(i, j) != 0
                    move_brick_one_step(i, j, direction)
                end
                j -= 1
            end
            i += 1
        end
    when "up"
        j = 0
        while j < 4
            i = 0
            while i < 4
                if brick_value(i, j) != 0
                    move_brick_one_step(i, j, direction)
                end
                i += 1
            end
            j += 1
        end
    when "down"
        j = 0
        while j < 4
            i = 3
            while i >= 0
                if brick_value(i, j) != 0
                    move_brick_one_step(i, j, direction)
                end
                i -= 1
            end
            j += 1
        end
    end
    draw_board()
end
        
def place_value(row_index, column_index, value)
    case value.to_s.length
    when 1
        @value_vector[row_index][column_index][3] = value
    when 2
        @value_vector[row_index][column_index][2] = value.to_s[0].to_i
        @value_vector[row_index][column_index][3] = value.to_s[1].to_i
    when 3
        @value_vector[row_index][column_index][2] = value.to_s[0].to_i
        @value_vector[row_index][column_index][3] = value.to_s[1].to_i
        @value_vector[row_index][column_index][4] = value.to_s[2].to_i
    when 4
        @value_vector[row_index][column_index][1] = value.to_s[0].to_i
        @value_vector[row_index][column_index][2] = value.to_s[1].to_i
        @value_vector[row_index][column_index][3] = value.to_s[2].to_i
        @value_vector[row_index][column_index][4] = value.to_s[3].to_i
    when 5
        @value_vector[row_index][column_index][1] = value.to_s[0].to_i
        @value_vector[row_index][column_index][2] = value.to_s[1].to_i
        @value_vector[row_index][column_index][3] = value.to_s[2].to_i
        @value_vector[row_index][column_index][4] = value.to_s[3].to_i
        @value_vector[row_index][column_index][5] = value.to_s[4].to_i
    when 6
        @value_vector[row_index][column_index][0] = value.to_s[0].to_i
        @value_vector[row_index][column_index][1] = value.to_s[1].to_i
        @value_vector[row_index][column_index][2] = value.to_s[2].to_i
        @value_vector[row_index][column_index][3] = value.to_s[3].to_i
        @value_vector[row_index][column_index][4] = value.to_s[4].to_i
        @value_vector[row_index][column_index][5] = value.to_s[5].to_i
    when 7
        @value_vector[row_index][column_index][0] = value.to_s[0].to_i
        @value_vector[row_index][column_index][1] = value.to_s[1].to_i
        @value_vector[row_index][column_index][2] = value.to_s[2].to_i
        @value_vector[row_index][column_index][3] = value.to_s[3].to_i
        @value_vector[row_index][column_index][4] = value.to_s[4].to_i
        @value_vector[row_index][column_index][5] = value.to_s[5].to_i
        @value_vector[row_index][column_index][6] = value.to_s[6].to_i
    end
end

def next_not_zero(i, j, direction)
    case direction
    when "left"
        case j
        when 0
            return nil
        when 1
            if brick_value(i, j-1) != 0
                return [brick_value(i, j-1), [i, j-1]]
            else
                return nil
            end
        when 2
            if brick_value(i, j-1) != 0
                return [brick_value(i, j-1), i, j-1]
            elsif brick_value(i, j-2) != 0
                return [brick_value(i, j-2), i, j-2]
            else
                return nil
            end
        when 3
            if brick_value(i, j-1) != 0
                return [brick_value(i, j-1), i, j-1]
            elsif brick_value(i, j-2) != 0
                return [brick_value(i, j-2), i, j-2]
            elsif brick_value(i, j-3) != 0
                return [brick_value(i, j-3), i, j-3]
            else
                return nil
            end
        end
    when "right"
        case j
        when 3
            return nil
        when 2
            if brick_value(i, j+1) != 0
                return [brick_value(i, j+1), i, j+1]
            else
                return nil
            end
        when 1
            if brick_value(i, j+1) != 0
                return [brick_value(i, j+1), i, j+1]
            elsif brick_value(i, j+2) != 0
                return [brick_value(i, j+2), i, j+2]
            else
                return nil
            end
        when 0
            if brick_value(i, j+1) != 0
                return [brick_value(i, j+1), i, j+1]
            elsif brick_value(i, j+2) != 0
                return [brick_value(i, j+2), i, j+2]
            elsif brick_value(i, j+3) != 0
                return [brick_value(i, j+3), i, j+3]
            else
                return nil
            end
        end
    when "down"
        case i
        when 3
            return nil
        when 2
            if brick_value(i+1, j) != 0
                return [brick_value(i+1, j), i+1, j]
            else
                return nil
            end
        when 1
            if brick_value(i+1, j) != 0
                return [brick_value(i+1, j), i+1, j]
            elsif brick_value(i+2, j) != 0
                return [brick_value(i+2, j), i+1, j]
            else
                return nil
            end
        when 0
            if brick_value(i+1, j) != 0
                return [brick_value(i+1, j), i+1, j]
            elsif brick_value(i+2, j) != 0
                return [brick_value(i+2, j), i+2, j]
            elsif brick_value(i+3, j) != 0
                return [brick_value(i+3, j), i+3, j]
            else
                return nil
            end
        end
    when "up"
        case i
        when 0
            return nil
        when 1
            if brick_value(i-1, j) != 0
                return [brick_value(i-1, j), i-1, j]
            else
                return nil
            end
        when 2
            if brick_value(i-1, j) != 0
                return [brick_value(i-1, j), i-1, j]
            elsif brick_value(i-2, j) != 0
                return [brick_value(i-2, j), i-2, j]
            else
                return nil
            end
        when 3
            if brick_value(i-1, j) != 0
                return [brick_value(i-1, j), i-1, j]
            elsif brick_value(i-2, j) != 0
                return [brick_value(i-2, j), i-2, j]
            elsif brick_value(i-3, j) != 0
                return [brick_value(i-3, j), i-3, j]
            else
                return nil
            end
        end
    end
end

def existing_empty_bricks()
    counter = 0
    i = 0
    while i < 4
        j = 0
        while j < 4
            if @value_vector[i][j][3] == " "
                counter += 1
            end
            j += 1
        end
        i += 1
    end
    return counter > 0
end

def create_new_brick()
    random_row_index = (rand() * 4).floor
    random_column_index = (rand() * 4).floor
    while @value_vector[random_row_index][random_column_index][3] != " "
        random_row_index = (rand() * 4).floor
        random_column_index = (rand() * 4).floor
    end
    if rand() > 0.7
        number = 4
    else
        number = 2
    end
    @value_vector[random_row_index][random_column_index][3] = number
    @current_points += number
    draw_board()
end

user_input = ""
create_new_brick()

while user_input != "q" && existing_empty_bricks()
    user_input = gets.chomp
    @still_moving = true
    clear_joined_markers()
    if user_input.downcase == "a"
        while can_still_move("left") && @still_moving
            move_all_one_step("left")
            sleep 0.05
        end
    elsif user_input.downcase == "d"
        while can_still_move("right") && @still_moving
            move_all_one_step("right")
            sleep 0.05
        end
    elsif user_input.downcase == "s"
        while can_still_move("down") && @still_moving
            move_all_one_step("down")
            sleep 0.05
        end
    elsif user_input.downcase == "w"
        while can_still_move("up") && @still_moving
            move_all_one_step("up")
            sleep 0.05
        end
    end
    create_new_brick()
end

if !existing_empty_bricks
    puts "GAME OVER, PRESS ENTER"
elsif user_input == "q"
    puts "QUITTED GAME, PRESS ENTER"
end

gets
system("clear")